/**
Copyright 2016 Split Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/
const log = require('debug')('splitio-utils:events');

const EventEmitter = require('events').EventEmitter;
const eventHandler = new EventEmitter();
const eventConstants = {
  SDK_READY: 'state::ready',
  SDK_UPDATE: 'state::update',
  SDK_UPDATE_ERROR: 'state::update-error'
};

module.exports = (function () {
  let isReady = false;
  let eventObject = Object.create(eventHandler);

  return Object.assign(eventObject, {
    emit(eventName, ...listeners) {
      if (eventName !== eventConstants.SDK_READY && isReady) {
        log(`Event ${eventConstants.SDK_READY} emitted`);
        eventHandler.emit(eventName, ...listeners);
      } else if (eventName === eventConstants.SDK_READY) {
        log(`Event ${eventConstants.SDK_UPDATE} emitted`);
        isReady = true;
        eventHandler.emit(eventName, ...listeners);
      }
    }
  });
}());

module.exports.events = eventConstants;
