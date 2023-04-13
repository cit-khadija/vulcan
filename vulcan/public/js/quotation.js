frappe.ui.form.on('Quotation', {
    refresh: function(frm){
        if(frm.doc.docstatus===0){
            //Add Hardware Set Button
            frm.fields_dict.items.grid.add_custom_button(__('Add/Edit Hardware Set'), () => {
				add_item_dialog(frm);
			});
            frm.fields_dict.items.grid.grid_buttons.find('.btn-custom').removeClass('btn-default').addClass('btn-secondary')
        }
        // add_hardware_items(frm) //To generate hardware set items list. Gets generated in delivery note so not really required.
    },
    validate: function(frm){
        validate_hw_sets(frm);
    },
});

var add_item_dialog = function(frm){
    let d = new frappe.ui.Dialog({
        title: "Add Hardware Set",
        fields: [
            {
                label:"Hardware Set",
                fieldname:"hardware_set",
                fieldtype:"Link",
                options:"Hardware Set",
                reqd:1,
                get_query: ()=>{
                    var set_list = [];
                    if(frm.doc.items && frm.doc.items.length > 0){
                        $.each(frm.doc.items, (k,item)=>{
                            if(item.hardware_set){
                                set_list.push(item.hardware_set);
                            }
                        });
                    }
                    set_list = [...new Set(set_list)];
                    return {
                        filters: {'hardware_set': ['in',set_list]}
                    };
                }
            },
            {
                label:"Fetch Items",
                fieldname:"fetch_items",
                fieldtype:"Button",
                click: ()=>{ fetch_items(frm, d)}
            },
            {
                label:"Add Items for Hardware Set", 
                fieldname:"items",
                fieldtype: "Table",
                cannot_add_rows: false,
                is_editable_grid: true,
                data: [],
                in_place_edit: true,
                fields: [
                    {
                        label:"Item",
                        fieldname: "item_code",
                        fieldtype: "Link",
                        options:"Item",
                        reqd:1,
                        in_list_view: true,
                        onchange: ()=>{
                            d.fields_dict.items.df.data.some(item => {
                                frappe.db.get_value("Item", item.item_code, ['item_name', 'description','stock_uom']).then(r => {
                                    if (r.message){
                                        item.description = r.message.description;
                                        item.uom = r.message.stock_uom;
                                        if (item.item_name != r.message.item_name){
                                            item.item_name = r.message.item_name;
                                        }
                                        if(!item.qty){
                                            item.qty = 1;
                                        }
                                        d.fields_dict.items.grid.refresh();
                                        return true;
                                    }
                                });
                            });
                        }
                    },
                    {
                        label:"Item Name",
                        fieldname:"item_name",
                        fieldtype:"Data",
                        in_list_view: true
                    },  
                    {
                        label:"Description",
                        fieldname:"description",
                        fieldtype:"Text Editor",
                        in_list_view:true
                    },
                    {
                        label:"Quantity",
                        fieldname:"qty",
                        fieldtype:"Float",
                        in_list_view:true
                    },
                    {
                        label:"UOM",
                        fieldname:"uom",
                        fieldtype:"Link",
                        options:"UOM",
                        in_list_view:true
                    }
                ]
            }
        ],
        primary_action_label: "Add",
        primary_action(values){
            d.hide();
            add_hardware_set(values, frm);
        }
    });
    d.show();
    d.$wrapper.find('.modal-content').css("width", "800px");
};

var add_hardware_set = function(values, frm){
    //Function to add hardware set data entered in dialog.
    
    //validate if same item codes have been added more than once
    var items_list = [];
    $.each(values.items, (k,item)=>{
        if(items_list.includes(item.item_code)){
            frappe.throw("Duplicate Items cannot be added to same Hardware Set. Please try again.");
        } else {
            items_list.push(item.item_code);
        }
    });

    //Get and update hw_set_data    
    var hw_set_data = {};
    if(frm.doc.hw_set_data){
        hw_set_data = JSON.parse(frm.doc.hw_set_data);
    }

    if(values.items && values.items.length > 0){
        hw_set_data[values.hardware_set]=[];
        $.each(values.items, function(k, item){
            let x={
                'item_code': item.item_code,
                'item_name': item.item_name,
                'qty': item.qty,
                'uom': item.uom,
                'description':item.description
            };
            hw_set_data[values.hardware_set].push(x);
        });
    }
    frm.set_value("hw_set_data", JSON.stringify(hw_set_data));
};

var validate_hw_sets = function(frm){
    //Validate if all hardware_sets are defined.
    var hw_set_data = {};
    if(frm.doc.hw_set_data){
        hw_set_data = JSON.parse(frm.doc.hw_set_data);
    }

    if(frm.doc.items && frm.doc.items.length>0){
        $.each(frm.doc.items, (k, item)=>{
            if(item.hardware_set){
                if(!hw_set_data[item.hardware_set]){
                    let message = "Please add details for Hardware Set "+item.hardware_set;
                    frappe.throw(message);
                }
            }
        });
    }
};

var fetch_items = function(frm, d){
    //Fetch hw_set data defined for hardware set
    if(frm.doc.hw_set_data){
        var hardware_set = d.fields_dict.hardware_set.value;
        var hw_set_data = JSON.parse(frm.doc.hw_set_data);

        $.each(hw_set_data[hardware_set], function(k, item){
            d.fields_dict.items.df.data.push(item);
        });
        d.fields_dict.items.grid.refresh();
    }
};