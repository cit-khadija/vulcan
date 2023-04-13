# import frappe

# def before_save_method(doc, method):
#     # Render Summary Table
#     summary_html='''
#         <div class="col-md-12">
#             {%- if hw_set_data -%}
#                 {% set data = json.loads(hw_set_data) %}
#                 {% set items = data[hardware_set] %}
#                 <p>Hardware Set Ref: <b>{{hardware_set}}</b></p>
#                 <table class="table table-condensed" style="width:100%; height:5px; font-size:10px">
#                     <thead style="display:table-header-group;">
#                         <tr style="height:5px;">
#                             <th class="text-center" style="width:5%; border:1px solid;border-color:#C6C6C6;">Item</th>
#                             <th class="text-center" style="width:10%; border:1px solid;border-color:#C6C6C6;">Item Name</th>
#                             <th class="text-center" style="border:1px solid;border-color:#C6C6C6;">Description</th>
#                             <th class="text-center" style="width:7%; border:1px solid;border-color:#C6C6C6;">Quantity</th>
#                             <th class="text-center" style="width:7%; border:1px solid;border-color:#C6C6C6;">UOM</th>
#                         </tr>
#                     </thead>
#                     {% for item in items %}
#                         <tr class="items">
#                             <td align="left" style="border:1px solid;border-color:#C6C6C6;">{{ item["item_code"] or ""}}</td>
#                             <td align="left" style="border:1px solid;border-color:#C6C6C6;">{{ item["item_name"] or ""}}</td>
#                             <td align="left" style="border:1px solid;border-color:#C6C6C6;">{{ item["description"] or ""}}</td>
#                             <td align="center" style="border:1px solid;border-color:#C6C6C6;">{{ item["qty"] or ""}}</td>
#                             <td align="center" style="border:1px solid;border-color:#C6C6C6;">{{ item["uom"] or ""}}</td>
#                         </tr>
#                     {% endfor %}
#                     </table>
#             {% endif %} 
#         </div>'''
        
#     if(doc.sales_order_item):
#         hw_set = frappe.db.get_value("Sales Order Item", doc.sales_order_item, "hardware_set")
#         doc.hardware_set = hw_set
        
#     if(doc.sales_order):
#         hw_set_data = frappe.db.get_value("Sales Order", doc.sales_order, "hw_set_data")
#         doc.hw_set_data = hw_set_data
#         doc.db_set('hardware_set_summary', frappe.render_template(summary_html, dict(hw_set_data=hw_set_data, hardware_set=doc.hardware_set)))