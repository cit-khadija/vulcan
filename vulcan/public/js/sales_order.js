frappe.ui.form.on("Sales Order", {
    refresh: function(frm){
        add_hardware_items(frm)
    }
})

var add_hardware_items = function(frm){
    if(frm.doc.docstatus!==1){
        if(frm.doc.hw_set_data){
            var hw_set_data = JSON.parse(frm.doc.hw_set_data);
            var hardware_items= [];
            if(frm.doc.items && frm.doc.items.length > 0){
                $.each(frm.doc.items, (k, item)=>{
                    if (item.hardware_set){
                        if(hw_set_data[item.hardware_set]){
                            var hw_items = hw_set_data[item.hardware_set];
                            $.each(hw_items, (ki, hw_item)=>{
                                var new_hw_item = {
                                    ...hw_item,
                                    qty: (hw_item.qty * item.qty),
                                    for_item: item.item_code,
                                    item_row: item.idx,
                                    hardware_set: item.hardware_set
                                }
                                hardware_items.push(new_hw_item);
                            })
                        }
                }
            })
        }
        frm.set_value("hw_items", JSON.stringify(hardware_items))
    }
}
}