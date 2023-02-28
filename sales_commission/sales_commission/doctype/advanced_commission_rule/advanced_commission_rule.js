// Copyright (c) 2023, Frappe Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Advanced Commission Rule', {
	onload: function(frm) {
		frm.set_query('applicable_doctype',()=> {
			return{
				filters:[["name","in",["Sales Order","Sales Invoice","Delivery Note"]]]
			}
			
			
		});
	},
	refresh: function(frm) {
		frm.set_df_property("filters_section", "hidden", 1);
		frm.trigger('set_options1')
		frm.trigger('render_filters_table1')
		frm.trigger('set_options2');
		frm.trigger('render_filters_table2');
		console.log("applicable_doctype",frm.applicable_doctype)
	},

	applicable_doctype:function(frm){
		if(frm.doc.applicable_doctype){
		frm.trigger('set_options3')
		frm.trigger('render_filters_table3')
		}
	},

	//customer


	set_options2: function(frm) {
		let aggregate_based_on_fields_customer = [];
		const doctype = 'Customer';

		if (doctype) {
			frappe.model.with_doctype(doctype, () => {
				frappe.get_meta(doctype).fields.map(df => {
					if (frappe.model.numeric_fieldtypes.includes(df.fieldtype)) {
						if (df.fieldtype == 'Currency') {
							if (!df.options || df.options !== 'Company:company:default_currency') {
								return;
							}
						}
						aggregate_based_on_fields_customer.push({label: df.label, value: df.fieldname});
					}
				});

				frm.set_df_property('aggregate_function_based_on', 'options', aggregate_based_on_fields_customer);
			});
		}
	},

	render_filters_table2: function(frm) {
		frm.set_df_property("filters_section2", "hidden", 0);

		let wrapper = $(frm.get_field('customer_filter').wrapper).empty();
		frm.filter_table = $(`<table class="table table-bordered" style="cursor:pointer; margin:0px;">
			<thead>
				<tr>
					<th style="width: 33%">${__('Filter')}</th>
					<th style="width: 33%">${__('Condition')}</th>
					<th>${__('Value')}</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>`).appendTo(wrapper);
		$(`<p class="text-muted small">${__("Click table to edit")}</p>`).appendTo(wrapper);


		frm.filters = JSON.parse(frm.doc.customer_filter || '[]');

		frm.trigger('set_filters_in_table2');

		frm.filter_table.on('click', () => {
			let dialog = new frappe.ui.Dialog({
				title: __('Set Filters'),
				fields: [{
					fieldtype: 'HTML',
					fieldname: 'filter_area_for_customer',
				}],
				primary_action: function() {
					let values = this.get_values();
					if (values) {
						this.hide();
						frm.filters = frm.filter_group.get_filters();
						frm.set_value('customer_filter', JSON.stringify(frm.filters));
						frm.trigger('set_filters_in_table2');
					}
				},
				primary_action_label: "Set"
			});

			frappe.dashboards.filters_dialog = dialog;

			frm.filter_group = new frappe.ui.FilterGroup({
				parent: dialog.get_field('filter_area_for_customer').$wrapper,
				doctype: 'Customer',
				on_change: () => {},
			});

			frm.filter_group.add_filters_to_filter_group(frm.filters);

			dialog.show();
			dialog.set_values(frm.filters);
		});

	},

	set_filters_in_table2: function(frm) {
		if (!frm.filters.length) {
			const filter_row = $(`<tr><td colspan="3" class="text-muted text-center">
				${__("Click to Set Filters")}</td></tr>`);
			frm.filter_table.find('tbody').html(filter_row);
		} else {
			let filter_rows = '';
			frm.filters.forEach(filter => {
				filter_rows +=
					`<tr>
						<td>${filter[1]}</td>
						<td>${filter[2] || ""}</td>
						<td>${filter[3]}</td>
					</tr>`;

			});
			frm.filter_table.find('tbody').html(filter_rows);
		}
	},

	//item

	set_options1: function(frm) {
		let aggregate_based_on_fields_item = [];
		const doctype = 'Item';

		if (doctype) {
			frappe.model.with_doctype(doctype, () => {
				frappe.get_meta(doctype).fields.map(df => {
					if (frappe.model.numeric_fieldtypes.includes(df.fieldtype)) {
						if (df.fieldtype == 'Currency') {
							if (!df.options || df.options !== 'Company:company:default_currency') {
								return;
							}
						}
						aggregate_based_on_fields_item.push({label: df.label, value: df.fieldname});
					}
				});

				frm.set_df_property('aggregate_function_based_on_item', 'options', aggregate_based_on_fields_item);
			});
		}
	},

	render_filters_table1: function(frm) {
		frm.set_df_property("filters_section1", "hidden", 0);

		let wrapper = $(frm.get_field('item_filter').wrapper).empty();
		frm.filter_table_item = $(`<table class="table table-bordered" style="cursor:pointer; margin:0px;">
			<thead>
				<tr>
					<th style="width: 33%">${__('Filter')}</th>
					<th style="width: 33%">${__('Condition')}</th>
					<th>${__('Value')}</th>
				</tr>
			</thead>
			<tbody ></tbody>
		</table>`).appendTo(wrapper);
		$(`<p class="text-muted small">${__("Click table to edit")}</p>`).appendTo(wrapper);


		frm.filters_item = JSON.parse(frm.doc.item_filter || '[]');

		frm.trigger('set_filters_in_table1');

		frm.filter_table_item.on('click', () => {
			let dialog_item = new frappe.ui.Dialog({
				title: __('Set Filters'),
				fields: [{
					fieldtype: 'HTML',
					fieldname: 'filter_area_for_item',
				}],
				primary_action: function() {
					let values = this.get_values();
					if (values) {
						this.hide();
						frm.filters_item = frm.filter_group_item.get_filters();
						frm.set_value('item_filter', JSON.stringify(frm.filters_item));
						frm.trigger('set_filters_in_table1');
					}
				},
				primary_action_label: "Set"
			});

			frappe.dashboards.filters_dialog = dialog_item;

			frm.filter_group_item = new frappe.ui.FilterGroup({
				parent: dialog_item.get_field('filter_area_for_item').$wrapper,
				doctype: 'Item',
				on_change: () => {},
			});

			frm.filter_group_item.add_filters_to_filter_group(frm.filters_item);

			dialog_item.show();
			dialog_item.set_values(frm.filters_item);
		});

	},

	set_filters_in_table1: function(frm) {
		if (!frm.filters_item.length) {
			const filter_row_item = $(`<tr><td colspan="3" class="text-muted text-center">
				${__("Click to Set Filters")}</td></tr>`);
			frm.filter_table_item.find('tbody').html(filter_row_item);
		} else {
			let filter_rows_item = '';
			frm.filters_item.forEach(filter => {
				filter_rows_item +=
					`<tr>
						<td>${filter[1]}</td>
						<td>${filter[2] || ""}</td>
						<td>${filter[3]}</td>
					</tr>`;

			});
			frm.filter_table_item.find('tbody').html(filter_rows_item);
		}
	},

	set_options3: function(frm) {
		let aggregate_based_on_fields_dyn = [];
		const doctype = frm.doc.applicable_doctype;

		if (doctype) {
			frappe.model.with_doctype(doctype, () => {
				frappe.get_meta(doctype).fields.map(df => {
					if (frappe.model.numeric_fieldtypes.includes(df.fieldtype)) {
						if (df.fieldtype == 'Currency') {
							if (!df.options || df.options !== 'Company:company:default_currency') {
								return;
							}
						}
						aggregate_based_on_fields_dyn.push({label: df.label, value: df.fieldname});
					}
				});

				frm.set_df_property('aggregate_function_based_on_dyn', 'options', aggregate_based_on_fields_dyn);
			});
		}
	},

	render_filters_table3: function(frm) {
		frm.set_df_property("filters_section3", "hidden", 0);

		let wrapper = $(frm.get_field('dynamic_filters_json').wrapper).empty();
		frm.filter_table_dyn = $(`<table class="table table-bordered" style="cursor:pointer; margin:0px;">
			<thead>
				<tr>
					<th style="width: 33%">${__('Filter')}</th>
					<th style="width: 33%">${__('Condition')}</th>
					<th>${__('Value')}</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>`).appendTo(wrapper);
		$(`<p class="text-muted small">${__("Click table to edit")}</p>`).appendTo(wrapper);


		frm.filters_dyn = JSON.parse(frm.doc.dynamic_filters_json || '[]');

		frm.trigger('set_filters_in_table3');

		frm.filter_table_dyn.on('click', () => {
			let dialog_dyn = new frappe.ui.Dialog({
				title: __('Set Filters'),
				fields: [{
					fieldtype: 'HTML',
					fieldname: 'filter_area_dyn',
				}],
				primary_action: function() {
					let values = this.get_values();
					if (values) {
						this.hide();
						frm.filters_dyn = frm.filter_group_dyn.get_filters();
						frm.set_value('dynamic_filters_json', JSON.stringify(frm.filters_dyn));
						frm.trigger('set_filters_in_table3');
					}
				},
				primary_action_label: "Set"
			});

			frappe.dashboards.filters_dialog = dialog_dyn;

			frm.filter_group_dyn = new frappe.ui.FilterGroup({
				parent: dialog_dyn.get_field('filter_area_dyn').$wrapper,
				doctype: frm.doc.applicable_doctype,
				on_change: () => {},
			});

			frm.filter_group_dyn.add_filters_to_filter_group(frm.filters_dyn);

			dialog_dyn.show();
			dialog_dyn.set_values(frm.filters_dyn);
		});

	},

	set_filters_in_table3: function(frm) {
		if (!frm.filters_dyn.length) {
			const filter_row_dyn = $(`<tr><td colspan="3" class="text-muted text-center">
				${__("Click to Set Filters")}</td></tr>`);
			frm.filter_table_dyn.find('tbody').html(filter_row_dyn);
		} else {
			let filter_rows_dyn = '';
			frm.filters_dyn.forEach(filter => {
				filter_rows_dyn +=
					`<tr>
						<td>${filter[1]}</td>
						<td>${filter[2] || ""}</td>
						<td>${filter[3]}</td>
					</tr>`;

			});
			frm.filter_table_dyn.find('tbody').html(filter_rows_dyn);
		}
	},


 });
