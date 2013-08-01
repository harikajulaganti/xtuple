/*jshint bitwise:true, indent:2, curly:true, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true, white:true*/
/*global XT:true, XM:true, XV:true, _:true, window: true, enyo:true, Globalize:true*/

(function () {

  XT.extensions.inventory.initLists = function () {

    // ..........................................................
    // BACKLOG REPORT
    //

    enyo.kind({
      name: "XV.SalesOrderLineListItem",
      kind: "XV.List",
      label: "_backlog".loc(),
      collection: "XM.SalesOrderLineListItemCollection",
      query: {orderBy: [
        {attribute: 'salesOrder.number'},
        {attribute: 'lineNumber'},
        {attribute: 'subNumber'}
      ]},
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableRows", components: [
            {kind: "FittableColumns", name: "header", classes: "header", headerAttr: "salesOrder.number", components: [
              {kind: "XV.ListColumn", classes: "short", components: [
                {kind: "XV.ListAttr", attr: "salesOrder.number", isKey: true, classes: "header"}
              ]},
              {kind: "XV.ListColumn", classes: "first", components: [
                {kind: "XV.ListAttr", attr: "salesOrder.customer.name", classes: "header"}
              ]},
              {kind: "XV.ListColumn", classes: "second", components: [
                {kind: "XV.ListAttr", attr: "salesOrder.shiptoName", classes: "header"}
              ]},
              {kind: "XV.ListColumn", classes: "second", components: [
                {kind: "XV.ListAttr", attr: "salesOrder.scheduleDate", classes: "header"}
              ]},
              {kind: "XV.ListColumn", classes: "second", components: [
                {kind: "XV.ListAttr", attr: "salesOrder.salesRep.name", classes: "header"}
              ]},
              {kind: "XV.ListColumn", classes: "second", components: [
                {kind: "XV.ListAttr", attr: "salesOrder.total", formatter: "formatPrice", classes: "header"}
              ]},
              {kind: "XV.ListColumn", classes: "last", components: [
                {classes: "header"}
              ]}
            ]},
            {kind: "FittableColumns", components: [
              {kind: "XV.ListColumn", classes: "short", components: [
                {kind: "XV.ListAttr", attr: "lineNumber", formatter: "formatLineNumber"}
              ]},
              {kind: "XV.ListColumn", classes: "second", components: [
                {kind: "XV.ListAttr", attr: "itemSite.item.number", classes: "bold"},
                {kind: "XV.ListAttr", attr: "itemSite.item.description1"}
              ]},
              {kind: "XV.ListColumn", classes: "second", components: [
                {kind: "XV.ListAttr", attr: "salesOrder.orderDate"},
                {kind: "XV.ListAttr", attr: "scheduleDate"}
              ]},
              {kind: "XV.ListColumn", classes: "second", components: [
                {kind: "XV.ListAttr", attr: "quantity"},
                {kind: "XV.ListAttr", attr: "quantityUnit.name"}
              ]},
              {kind: "XV.ListColumn", classes: "second", components: [
                {kind: "XV.ListAttr", attr: "quantityShipped"}
              ]},
              {kind: "XV.ListColumn", classes: "second", components: [
                {kind: "XV.ListAttr", attr: "shipBalance", classes: "bold"}
              ]},
              {kind: "XV.ListColumn", classes: "second", components: [
                {kind: "XV.ListAttr", attr: "price", formatter: "formatPrice"},
                {kind: "XV.ListAttr", attr: "priceUnit.name"}
              ]},
              {kind: "XV.ListColumn", components: [
                {kind: "XV.ListAttr", attr: "extendedPrice", formatter: "formatPrice", classes: "right"}
              ]}
            ]}
          ]}
        ]}
      ],
      formatPrice: function (value, view, model) {
        var currency = model ? model.getValue("salesOrder.currency") : false,
          scale = XT.session.locale.attributes.salesPriceScale;
        return currency ? currency.format(value, scale) : "";
      },
      formatLineNumber: function (value, view, model) {
        var lineNumber = model.get("lineNumber"),
          subnumber = model.get("subnumber");
        if (subnumber === 0) {
          value = lineNumber;
        } else {
          value = lineNumber + "." + subnumber;
        }
        return value;
      }
    });

    // ..........................................................
    // ENTER RECEIPT
    //

    enyo.kind({
      name: "XV.EnterReceiptList",
      kind: "XV.List",
      label: "_enterReceipt".loc(),
      collection: "XM.PurchaseOrderLineCollection",
      parameterWidget: "XV.EnterReceiptParameters",
      query: {orderBy: [
        {attribute: 'lineNumber'}
      ]},
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "first", components: [
              {kind: "FittableColumns", components: [
                {kind: "XV.ListAttr", attr: "lineNumber"},
                {kind: "XV.ListAttr", attr: "itemSite.site.code",
                  classes: "right"},
                {kind: "XV.ListAttr", attr: "itemSite.item.number", fit: true}
              ]},
              {kind: "XV.ListAttr", attr: "itemSite.item.description1",
                fit: true,  style: "text-indent: 18px;"}
            ]},
            {kind: "XV.ListColumn", classes: "money", components: [
              {kind: "XV.ListAttr", attr: "ordered",
                formatter: "formatQuantity", style: "text-align: right"}
            ]},
            {kind: "XV.ListColumn", classes: "money", components: [
              {kind: "XV.ListAttr", attr: "received",
                formatter: "formatQuantity", style: "text-align: right"}
            ]},
            {kind: "XV.ListColumn", classes: "money", components: [
              {kind: "XV.ListAttr", attr: "toReceive",
                formatter: "formatQuantity", style: "text-align: right"}
            ]},
            {kind: "XV.ListColumn", classes: "money", components: [
              {kind: "XV.ListAttr", attr: "dueDate",
                style: "text-align: right"}
            ]}
          ]}
        ]}
      ],
      formatDueDate: function (value, view, model) {
        var today = new Date(),
          isLate = XT.date.compareDate(value, today) < 1;
        view.addRemoveClass("error", isLate);
        return value;
      },
      formatQuantity: function (value, view, model) {
        var scale = XT.session.locale.attributes.quantityScale;
        return Globalize.format(value, "n" + scale);
      }
    });

    XV.registerModelList("XM.PurchaseOrderRelation", "XV.PurchaseOrderLineListItem");

    // ..........................................................
    // ISSUE TO SHIPPING
    //

    enyo.kind({
      name: "XV.IssueToShippingList",
      kind: "XV.List",
      label: "_issueToShipping".loc(),
      collection: "XM.ShippableSalesOrderLineCollection",
      parameterWidget: "XV.IssueToShippingParameters",
      query: {orderBy: [
        {attribute: 'lineNumber'},
        {attribute: 'subNumber'}
      ]},
      showDeleteAction: false,
      actions: [
        {name: "issueStock", prerequisite: "canIssueStock",
          method: "doIssueStock", notify: false},
        {name: "issueLine", prerequisite: "canIssueStock",
          method: "doIssueLine", notify: false},
        {name: "returnLine", prerequisite: "canReturnStock",
          method: "doReturnStock", notify: false}
      ],
      toggleSelected: true,
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "first", components: [
              {kind: "FittableColumns", components: [
                {kind: "XV.ListAttr", attr: "lineNumber"},
                {kind: "XV.ListAttr", attr: "site.code",
                  classes: "right"},
                {kind: "XV.ListAttr", attr: "item.number", fit: true}
              ]},
              {kind: "XV.ListAttr", attr: "item.description1",
                fit: true,  style: "text-indent: 18px;"}
            ]},
            {kind: "XV.ListColumn", classes: "money", components: [
              {kind: "XV.ListAttr", attr: "ordered",
                formatter: "formatQuantity", style: "text-align: right"}
            ]},
            {kind: "XV.ListColumn", classes: "money", components: [
              {kind: "XV.ListAttr", attr: "balance",
                formatter: "formatQuantity", style: "text-align: right"}
            ]},
            {kind: "XV.ListColumn", classes: "money", components: [
              {kind: "XV.ListAttr", attr: "atShipping",
                formatter: "formatQuantity", style: "text-align: right"}
            ]},
            {kind: "XV.ListColumn", classes: "money", components: [
              {kind: "XV.ListAttr", attr: "scheduleDate",
                style: "text-align: right"}
            ]}
          ]}
        ]}
      ],
      formatDueDate: function (value, view, model) {
        var today = new Date(),
          isLate = XT.date.compareDate(value, today) < 1;
        view.addRemoveClass("error", isLate);
        return value;
      },
      formatLineNumber: function (value, view, model) {
        var lineNumber = model.get("lineNumber"),
          subnumber = model.get("subNumber");
        if (subnumber === 0) {
          value = lineNumber;
        } else {
          value = lineNumber + "." + subnumber;
        }
        return value;
      },
      formatQuantity: function (value, view, model) {
        var scale = XT.session.locale.attributes.quantityScale;
        return Globalize.format(value, "n" + scale);
      }
    });

    XV.registerModelList("XM.SalesOrderRelation", "XV.SalesOrderLineListItem");
 
    // ..........................................................
    // SHIPMENT
    //

    enyo.kind({
      name: "XV.ShipmentList",
      kind: "XV.List",
      label: "_shipments".loc(),
      collection: "XM.ShipmentCollection",
      actions: [{
        name: "recallShipment",
        method: "doRecallShipment",
        prerequisite: "canRecallShipment",
        notifyMessage: "_recallShipment?".loc()
      }],
      query: {orderBy: [
        {attribute: 'shipDate'}
      ]},
      parameterWidget: "XV.ShipmentListItemParameters",
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "first", components: [
              {kind: "FittableColumns", components: [
                {kind: "XV.ListAttr", attr: "number", isKey: true, fit: true},
                {kind: "XV.ListAttr", attr: "order.customer.name", fit: true, classes: "right"}
              ]},
              {kind: "FittableColumns", components: [
                {kind: "XV.ListAttr", attr: "orderType"},
                {kind: "XV.ListAttr", attr: "order.number", classes: "right"}
              ]}
            ]},
            {kind: "XV.ListColumn", classes: "second", components: [
              {kind: "XV.ListAttr", attr: "shipDate"},
              {kind: "XV.ListAttr", attr: "isShipped"}
            ]},
            {kind: "XV.ListColumn", classes: "second", components: [
              {kind: "XV.ListAttr", attr: "freight", formatter: "formatExtendedPrice"},
              {kind: "XV.ListAttr", attr: "currency"}
            ]},
            {kind: "XV.ListColumn", classes: "second", components: [
              {kind: "XV.ListAttr", attr: "isShipped"},
              {kind: "XV.ListAttr", att: "isInvoicePosted"}
            ]}
          ]}
        ]}
      ],

      formatExtendedPrice: function (value, view, model) {
        var currency = model ? model.getValue("currency") : false,
          scale = XT.session.locale.attributes.extendedPriceScale;
        return currency ? currency.format(value, scale) : "";
      }
    });

    XV.registerModelList("XM.Shipment", "XV.ShipmentList");

    // ..........................................................
    // VENDOR
    //

    enyo.kind({
      name: "XV.VendorList",
      kind: "XV.List",
      label: "_vendors".loc(),
      collection: "XM.VendorRelationCollection",
      query: {orderBy: [
        {attribute: 'number'}
      ]},
      allowPrint: true,
      parameterWidget: "XV.VendorListParameters",
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "first", components: [
              {kind: "FittableColumns", components: [
                {kind: "XV.ListAttr", attr: "number", isKey: true},
                {kind: "XV.ListAttr", attr: "contact1.phone", fit: true,
                  classes: "right"}
              ]},
              {kind: "FittableColumns", components: [
                {kind: "XV.ListAttr", attr: "name"},
                {kind: "XV.ListAttr", attr: "contact1.primaryEmail",
                  ontap: "sendMail", classes: "right hyperlink"}
              ]}
            ]},
            {kind: "XV.ListColumn", classes: "last", fit: true, components: [
              {kind: "XV.ListAttr", attr: "contact1.name", classes: "italic",
                placeholder: "_noContact".loc()},
              {kind: "XV.ListAttr", attr: "address.formatShort"}
            ]}
          ]}
        ]}
      ],
      sendMail: function (inSender, inEvent) {
        var model = this.getModel(inEvent.index),
          email = model ? model.getValue('contact1.primaryEmail') : null,
          win;
        if (email) {
          win = window.open('mailto:' + email);
          win.close();
        }
        return true;
      }
    });

    XV.registerModelList("XM.VendorRelation", "XV.VendorList");

  };
}());
