// Generated by IcedCoffeeScript 1.7.1-e
(function() {
  var BaseScraper, HackerNewsScraper, constants, decode, iced, make_ids, proof_text_check_to_med_id, v_codes, __iced_k, __iced_k_noop, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  iced = require('iced-runtime');
  __iced_k = __iced_k_noop = function() {};

  BaseScraper = require('./base').BaseScraper;

  constants = require('../constants').constants;

  v_codes = constants.v_codes;

  _ref = require('../base'), make_ids = _ref.make_ids, proof_text_check_to_med_id = _ref.proof_text_check_to_med_id;

  decode = require('pgp-utils').armor.decode;

  exports.HackerNewsScraper = HackerNewsScraper = (function(_super) {
    __extends(HackerNewsScraper, _super);

    function HackerNewsScraper(opts) {
      HackerNewsScraper.__super__.constructor.call(this, opts);
    }

    HackerNewsScraper.prototype._check_args = function(args) {
      if (!(args.username != null)) {
        return new Error("Bad args to HackerNews proof: no username given");
      } else if (!(args.name != null) || (args.name !== 'hackernews')) {
        return new Error("Bad args to HackerNews proof: type is " + args.name);
      } else {
        return null;
      }
    };

    HackerNewsScraper.prototype.api_base = function(username) {
      return "https://hacker-news.firebaseio.com/v0/user/" + username;
    };

    HackerNewsScraper.prototype.api_url = function(username) {
      return this.api_base(username) + "/about.json";
    };

    HackerNewsScraper.prototype.karma_url = function(username) {
      return this.api_base(username) + "/karma.json";
    };

    HackerNewsScraper.prototype.human_url = function(username) {
      return "https://news.ycombinator.com/user?id=" + username;
    };

    HackerNewsScraper.prototype.get_karma = function(username, cb) {
      var err, json, rc, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase/proofs/src/scrapers/hackernews.iced",
            funcname: "HackerNewsScraper.get_karma"
          });
          _this._get_url_body({
            url: _this.karma_url(username),
            json: true
          }, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                err = arguments[0];
                rc = arguments[1];
                return json = arguments[2];
              };
            })(),
            lineno: 36
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          return cb(err, json);
        };
      })(this));
    };

    HackerNewsScraper.prototype.hunt2 = function(_arg, cb) {
      var err, name, out, proof_text_check, rc, username;
      username = _arg.username, name = _arg.name, proof_text_check = _arg.proof_text_check;
      out = {};
      rc = v_codes.OK;
      if ((err = this._check_args({
        username: username,
        name: name
      })) == null) {
        out = {
          rc: rc,
          api_url: this.api_url(username),
          human_url: this.human_url(username),
          remote_id: username
        };
      }
      return cb(err, out);
    };

    HackerNewsScraper.prototype._check_api_url = function(_arg) {
      var api_url, username;
      api_url = _arg.api_url, username = _arg.username;
      return api_url === this.api_url(username);
    };

    HackerNewsScraper.prototype._validate_text_check = function(_arg) {
      var err, med_id, msg, proof_text_check, signature, _ref1;
      signature = _arg.signature, proof_text_check = _arg.proof_text_check;
      _ref1 = decode(signature), err = _ref1[0], msg = _ref1[1];
      if (err == null) {
        med_id = make_ids(msg.body).med_id;
        if (med_id !== proof_text_check) {
          err = new Error("Bad payload text_check");
        }
      }
      return err;
    };

    HackerNewsScraper.prototype.check_status = function(_arg, cb) {
      var api_url, err, html, proof_text_check, rc, remote_id, search_for, username, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      username = _arg.username, api_url = _arg.api_url, proof_text_check = _arg.proof_text_check, remote_id = _arg.remote_id;
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/max/src/keybase/proofs/src/scrapers/hackernews.iced",
            funcname: "HackerNewsScraper.check_status"
          });
          _this._get_url_body({
            url: api_url
          }, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                err = arguments[0];
                rc = arguments[1];
                return html = arguments[2];
              };
            })(),
            lineno: 75
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          if (rc === v_codes.OK) {
            search_for = proof_text_check;
            if (html.indexOf(search_for) < 0) {
              rc = v_codes.NOT_FOUND;
            }
          }
          return cb(err, rc);
        };
      })(this));
    };

    return HackerNewsScraper;

  })(BaseScraper);

}).call(this);