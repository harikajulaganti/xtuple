create or replace function xt.fetch(data_hash text) returns text as $$
  /* Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
     See www.xm.ple.com/CPAL for the full text of the software license. */

  var dataHash = JSON.parse(data_hash),
    query = dataHash.query,
    recordType = query.recordType,
    orderBy = query.orderBy,
    parameters = query.parameters,
    rowLimit = query.rowLimit;
    rowOffset = query.rowOffset,
    data = Object.create(XT.Data), recs = null, 
    prettyPrint = query.prettyPrint ? 2 : null;
  recs = data.fetch(recordType, parameters, orderBy, rowLimit, rowOffset);

  if (dataHash.username) { XT.username = dataHash.username; }
 
  /* return the results */
  return JSON.stringify(recs, null, prettyPrint);

$$ language plv8;
/*
select xt.js_init();
select xt.fetch($${ "query":{
                         "recordType":"XM.ContactRelation",
                         "parameters":[{
                           "attribute":"firstName",
                           "value": "Mike"
                          }, {
                           "attribute": "lastName",
                           "value": "Farley"
                         }], 
                         "prettyPrint": true
                         }
                       }$$);

select xt.fetch($${ "query":{
                         "recordType":"XM.ContactRelation",
                         "parameters":[{
                           "attribute": "name",
                           "operator": "MATCHES",
                           "value": "Frank"
                          }], 
                          "orderBy": [{
                            "attribute": "lastName"
                          }, {
                            "attribute": "firstName"
                          }],
                         "prettyPrint": true
                         }
                       }$$);

select xt.fetch($${ "query":{
                         "recordType":"XM.AccountListItem",
                         "parameters":[{
                           "attribute":"primaryContact.address.state",
                           "value": "VA"
                          }],
                          "orderBy": [{
                            "attribute": "primaryContact.name",
                            "descending": true
                          }],
                         "prettyPrint": true
                         }
                       }$$);

select xt.fetch($${ "query":{
                         "recordType":"XM.ItemListItem",
                         "parameters":[{
                           "attribute": "number",
                           "operator": "BEGINS_WITH",
                           "value": "B"
                          }], 
                         "prettyPrint": true
                         }
                       }$$);

select xt.fetch($${ "query":{
                         "recordType":"XM.ToDoListItem",
                         "parameters":[{
                           "attribute":"dueDate",
                           "operator": ">=",
                           "value": "2009-07-17T12:13:01.506Z"
                          }], 
                         "prettyPrint": true
                         }
                       }$$);

select xt.fetch($${ "query":{
                         "recordType":"XM.ContactListItem",
                         "parameters":[{
                           "attribute": ["account.number", "account.name", "name", "phone", "address.city"],
                           "operator": "MATCHES",
                           "value": "ttoys"
                          }, {
                           "attribute": "firstName",
                           "operator": "BEGINS_WITH",
                           "value": "M"
                         }], 
                         "prettyPrint": true
                         }
                       }$$);

select xt.fetch($${ "query":{
                         "recordType":"XM.Contact",
                         "rowLimit": 10,
                         "prettyPrint": true
                         }
                       }$$);

*/
