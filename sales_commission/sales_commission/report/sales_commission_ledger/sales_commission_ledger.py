# Copyright (c) 2023, Dexciss and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	columns = [{'fieldname':'commission','label':'Commission','fieldtype':'Select','options':'[Sales Person,Sales Partner]'},
	{'fieldname':'document_date','label':'Document Date','fieldtype':'Date'},
	{'fieldname':'posting_date','label':'Posting Date','fieldtype':'Date'},
	{'fieldname':'dt','label':'DocType','fieldtype':'Link','options':'DocType'},
	{'fieldname':'doctype_id','label':'DocType Id','fieldtype':'Dynamic Link','options':'dt'},
	{'fieldname':'territory','label':'Territory','fieldtype':'Link','option':'DocType'},
	{'fieldname':'territory_manager','label':'Territory Manager','fieldtype':'Link','options':'Sales Person'},
	{'fieldname':'customer','label':'Customer','fieldtype':'Link','options':'Customer'},
	{'fieldname':'item','label':'Item','fieldtype':'Link','options':'Item'},
	{'fieldname':'item_name','label':'Item Name','fieldtype':'Data'},
	{'fieldname':'item_group','label':'Item Group','fieldtype':'Link','options':'Item Group'},
	{'fieldname':'brand','label':'Brand','fieldtype':'Link','options':'Brand'},
	{'fieldname':'partner','label':'Partner','fieldtype':'Select','options':'[Sales Partner,Sales Person]'},
	{'fieldname':'amount','label':'Amount','fieldtype':'Currency'},
	{'fieldname':'in_commission','label':'In Commission','fieldtype':'Currency'},
	{'fieldname':'out_commission','label':'Out Commission','fieldtype':'Currency'},
	{'fieldname':'balance_commission','label':'Balance Commission','fieldtype':'Currency'}
	]


	return columns
