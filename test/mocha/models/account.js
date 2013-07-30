/*jshint trailing:true, white:true, indent:2, strict:true, curly:true,
  immed:true, eqeqeq:true, forin:true, latedef:true,
  newcap:true, noarg:true, undef:true */
/*global XT:true, XM:true, XV:true, process:true, module:true, require:true, it:true, describe:true */

(function () {
  "use strict";

  var crud = require('../lib/crud'),
    data = {
      recordType: "XM.UserAccount",
      autoTestAttributes: true,
      verbose: true,
      createHash: {
        number: "Test_account" + Math.random(),
        name: "A test Account"
      },
      updateHash: {
        name: "updated_account"
      }
    };

  describe('Account CRUD Test', function () {
      this.timeout(30 * 1000);
      it('should perform all the crud operations', function (done) {
        crud.runAllCrud(data, done);
      });
    });
}());
