/**
 *
 *  Copyright 2015 WoT.City Open Source Project. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

/**
 * Modules
 */

var $ = require('jquery');
window.$ = $;
window.jQuery = $;
var _ = require('underscore');
var Backbone = require('backbone');
var Automation = require('automationjs');
var d3 = require('d3');
var iopctrl = require('./iopctrl');

/**
 * Setup
 */

Backbone.$ = window.$;
var app = app || {};

/**
 * MODELS
 **/

app.Container = Backbone.Model.extend({
  url: function() {
    return '/';
  },
  wsUrl: function() {
    return 'ws://wot.city/object/' + this.attributes.name + '/viewer';
  },
  defaults: {
    name: 'test',
    data: '',
    cid: 0,
    temp: 0
  },
  // AutomationJS plugins
  parseJSON: function() {
    // remove internal properties from model
    var objCopy = function(object) {
      var o = {};
      for (var p in object) {
        if (object.hasOwnProperty(p)) {
          // AutomationJS:
          // don't copy internal properties
          if (p === 'name' || p === 'data' || p === 'cid') {
              continue;
          }
          o[p] = object[p];
        }
      }
      return o;
    };

    var o = objCopy(this.attributes);

    this.set('data', JSON.stringify(o));
    this.trigger('sync');
  },
  // Y-Axis getter
  getY: function() {
    return this.get('temperature');
  }
});

/**
 * VIEWS
 **/

app.ContainerView = Backbone.View.extend({
  el: '#status',
  template: _.template( $('#tmpl-status').html() ),
  gauge: {},
  initialize: function() {
    this.component = new Automation({
      el: this.$el,
      model: app.Container,
      template: this.template
    });
    this.d3Init();
  },
  d3Init: function() {
    var svg = d3.select(this.el)
            .append("svg:svg")
            .attr("width", 600)
            .attr("height", 600);

    this.gauge = iopctrl.arcslider()
            .radius(120)
            .events(false)
            .indicator(iopctrl.defaultGaugeIndicator);
    this.gauge.axis().orient("in")
            .normalize(true)
            .ticks(12)
            .tickSubdivide(3)
            .tickSize(10, 8, 10)
            .tickPadding(5)
            .scale(d3.scale.linear()
                    .domain([0, 100])
                    .range([-3*Math.PI/4, 3*Math.PI/4]));

    this.segDisplay = iopctrl.segdisplay()
            .width(80)
            .digitCount(6)
            .negative(false)
            .decimals(0);

    svg.append("g")
            .attr("class", "segdisplay")
            .attr("transform", "translate(130, 200)")
            .call(this.segDisplay);

    svg.append("g")
            .attr("class", "gauge")
            .call(this.gauge);
  },
  render: function(name) {
    this.model = this.component.add({
        name: name
    });
    this.listenTo(this.model, 'sync', this.update);
  },
  syncUp: function(name) {
    this.render(name);
  },
  update: function() {
    var y = this.model.getY();
    this.gauge.value(y);
    this.segDisplay.value(y);
  }
});

/*
 * ROUTES
 */

app.AppRoutes = Backbone.Router.extend({
  routes: {
    ':name': 'appByName'
  },
  appByName: function(name) {
    app.containerView = new app.ContainerView();
    app.containerView.syncUp(name);
  }
});

/**
 * BOOTUP
 **/

$(function() {
  app.appRoutes = new app.AppRoutes();
  Backbone.history.start();
});
