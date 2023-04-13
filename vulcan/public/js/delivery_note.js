// Custom field list:
//     - hw_set_data => read_only
//     - hw_items => read_only
//     - items
//         - so_detail_ref => read_only; manipulated only through script
//         - is_hw_set_item => read_only; manipulated only through script
//         - hardware_set => read_only;

frappe.ui.form.on('Delivery Note', {
	refresh: function(frm) {
        frm.add_custom_button(__("Update Hardware Set Items"), function() {update_items(frm)})
	    if(frm.is_new()){  
            add_hardware_set_items(frm)
            frm.save()  
        }
        validate_items(frm)
	},
    validate: function(frm){
        if(frm.doc.hw_items){
            update_items(frm) //remove this after adding a proper validation function
            validate_items(frm)
        }
    }
})

var validate_items = function(frm){
    var hw_sets_qty = {}
    var hw_items_qty = {}

    var hw_set_data = {};
    if(frm.doc.hw_set_data){
        hw_set_data = JSON.parse(frm.doc.hw_set_data)
    }

    $.each(frm.doc.items, (k,item)=>{
        //Loop to find hardware set details required
        if(item.hardware_set && !item.is_hw_set_item){
            if(!(item.hardware_set in hw_sets_qty)){
                hw_sets_qty[item.hardware_set] = {}
            }

            let items_list = get_hw_set_items(item, hw_set_data)
            $.each(items_list, (code, qty)=>{
                if(!(code in hw_sets_qty[item.hardware_set])){
                    hw_sets_qty[item.hardware_set][code] = 0
                }
                hw_sets_qty[item.hardware_set][code] = hw_sets_qty[item.hardware_set][code] + qty
            })
        }

        //Loop to find hardware set details added
        if(item.is_hw_set_item){
            if(!(item.hardware_set in hw_items_qty)){
                hw_items_qty[item.hardware_set] = {}
            }
            if(!(item.item_code in hw_items_qty[item.hardware_set])){
                hw_items_qty[item.hardware_set][item.item_code] = 0
            }
            hw_items_qty[item.hardware_set][item.item_code] = hw_items_qty[item.hardware_set][item.item_code] + item.qty
        }
    })
    
    //TODO: Validation to be added
}

var get_hw_set_items = function(item, hw_set_data){
    if(item.hardware_set){
        if(hw_set_data[item.hardware_set]){
            var x = hw_set_data[item.hardware_set]
            var list = {};
            $.each(x, (k, hw_item)=>{
                list[hw_item.item_code] = hw_item.qty*item.qty
            })
            return list
        }
    }
}

var add_hardware_set_items = function(frm){
    add_hardware_items_from_hw_set_data(frm)
    if(frm.doc.hw_items){
        var hw_items = JSON.parse(frm.doc.hw_items);

        $.each(hw_items, (k, hw_item)=>{
            let child = frm.add_child("items", hw_item);
            frm.trigger('item_code', child.doctype, child.name);
        })
        frm.refresh_fields("items")
        frm.save()
    }
}

var get_selected_children = function(frm) {
    return (frm.fields_dict['items'].grid.grid_rows || []).map(row => {
        return row.doc.is_hw_set_item ? null : row.doc;
    }).filter(d => {
        return d;
    });
}

var update_items = function(frm){
    var item_list = get_selected_children(frm)
    frm.clear_table("items")

    $.each(item_list, (k, item)=>{
        let child = frm.add_child("items", item)
    })
    frm.refresh_fields("items")
    frm.save()

    add_hardware_set_items(frm)
}


var add_hardware_items_from_hw_set_data = function(frm){
    if(frm.doc.docstatus!==1){
        if(frm.doc.hw_set_data){
            var hw_set_data = JSON.parse(frm.doc.hw_set_data);
            var hardware_items= [];

            if(frm.doc.items && frm.doc.items.length > 0){
                $.each(frm.doc.items, (k, item)=>{
                    if (item.hardware_set && (!item.is_hw_set_item)){
                        if(hw_set_data[item.hardware_set]){
                            var hw_items = hw_set_data[item.hardware_set];
                            $.each(hw_items, (ki, hw_item)=>{
                                var new_hw_item = {
                                    ...hw_item,
                                    qty: (hw_item.qty * item.qty),
                                    for_item: item.item_code,
                                    hardware_set: item.hardware_set,
                                    is_hw_set_item: 1
                                }
                                hardware_items.push(new_hw_item);
                            })
                        }
                }
            })
        }
        frm.set_value("hw_items", JSON.stringify(hardware_items))
        frm.save()
    }
}
}