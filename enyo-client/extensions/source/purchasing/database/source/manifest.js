{
  "name": "purchasing",
  "comment": "Purchasing extension",
  "loadOrder": 50,
  "databaseScripts": [
    "xt/functions/po_freight_subtotal.sql",
    "xt/functions/po_line_extended_price.sql",
    "xt/functions/po_line_tax.sql",
    "xt/functions/po_schedule_date.sql",
    "xt/functions/po_subtotal.sql",
    "xt/functions/po_tax_total.sql",
    "xt/functions/po_total.sql",
    "xt/trigger_functions/itemsrc_did_change.sql",
    "xt/tables/poemlprofile.sql",
    "xt/tables/powf.sql",
    "xt/tables/potype.sql",
    "xt/tables/potypewf.sql",
    "xt/tables/wftype.sql",
    "xt/tables/acttype.sql",
    "xt/tables/poheadext.sql",
    "xt/views/itemsrcmfg.sql",
    "xt/views/poheadinfo.sql",
    "xt/views/poiteminfo.sql",
    "xm/javascript/item_source.sql",
    "xm/javascript/purchasing.sql",
    "xm/javascript/purchase_order.sql",
    "public/tables/itemsrc.sql"
  ]
}
