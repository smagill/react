/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {EventPriority} from 'shared/ReactTypes';
import type {TopLevelType} from 'legacy-events/TopLevelEventTypes';

import * as DOMTopLevelEventTypes from './DOMTopLevelEventTypes';
import {
  DiscreteEvent,
  UserBlockingEvent,
  ContinuousEvent,
} from 'shared/ReactTypes';

// We use multiple Sets to improve code size
// vs using an object for a map. Furthermore,
// in benchmarking the various approaches,
// doing lookups with Sets turned out faster
// than using the previous object lookup, which
// was dynamically generated (thus maybe somewhat
// slower that for V8 optimizations).
const discreteEvents = new Set([
  DOMTopLevelEventTypes.TOP_BLUR,
  DOMTopLevelEventTypes.TOP_CANCEL,
  DOMTopLevelEventTypes.TOP_CLICK,
  DOMTopLevelEventTypes.TOP_CLOSE,
  DOMTopLevelEventTypes.TOP_CONTEXT_MENU,
  DOMTopLevelEventTypes.TOP_COPY,
  DOMTopLevelEventTypes.TOP_CUT,
  DOMTopLevelEventTypes.TOP_AUX_CLICK,
  DOMTopLevelEventTypes.TOP_DOUBLE_CLICK,
  DOMTopLevelEventTypes.TOP_DRAG_END,
  DOMTopLevelEventTypes.TOP_DRAG_START,
  DOMTopLevelEventTypes.TOP_DROP,
  DOMTopLevelEventTypes.TOP_FOCUS,
  DOMTopLevelEventTypes.TOP_INPUT,
  DOMTopLevelEventTypes.TOP_INVALID,
  DOMTopLevelEventTypes.TOP_KEY_DOWN,
  DOMTopLevelEventTypes.TOP_KEY_PRESS,
  DOMTopLevelEventTypes.TOP_KEY_UP,
  DOMTopLevelEventTypes.TOP_MOUSE_DOWN,
  DOMTopLevelEventTypes.TOP_MOUSE_UP,
  DOMTopLevelEventTypes.TOP_PASTE,
  DOMTopLevelEventTypes.TOP_PAUSE,
  DOMTopLevelEventTypes.TOP_PLAY,
  DOMTopLevelEventTypes.TOP_POINTER_CANCEL,
  DOMTopLevelEventTypes.TOP_POINTER_DOWN,
  DOMTopLevelEventTypes.TOP_POINTER_UP,
  DOMTopLevelEventTypes.TOP_RATE_CHANGE,
  DOMTopLevelEventTypes.TOP_RESET,
  DOMTopLevelEventTypes.TOP_SEEKED,
  DOMTopLevelEventTypes.TOP_SUBMIT,
  DOMTopLevelEventTypes.TOP_TOUCH_CANCEL,
  DOMTopLevelEventTypes.TOP_TOUCH_END,
  DOMTopLevelEventTypes.TOP_TOUCH_START,
  DOMTopLevelEventTypes.TOP_VOLUME_CHANGE,
]);

const userBlockingEvents = new Set([
  DOMTopLevelEventTypes.TOP_DRAG,
  DOMTopLevelEventTypes.TOP_DRAG_ENTER,
  DOMTopLevelEventTypes.TOP_DRAG_EXIT,
  DOMTopLevelEventTypes.TOP_DRAG_LEAVE,
  DOMTopLevelEventTypes.TOP_DRAG_OVER,
  DOMTopLevelEventTypes.TOP_MOUSE_MOVE,
  DOMTopLevelEventTypes.TOP_MOUSE_OUT,
  DOMTopLevelEventTypes.TOP_MOUSE_OVER,
  DOMTopLevelEventTypes.TOP_POINTER_MOVE,
  DOMTopLevelEventTypes.TOP_POINTER_OUT,
  DOMTopLevelEventTypes.TOP_POINTER_OVER,
  DOMTopLevelEventTypes.TOP_SCROLL,
  DOMTopLevelEventTypes.TOP_TOGGLE,
  DOMTopLevelEventTypes.TOP_TOUCH_MOVE,
  DOMTopLevelEventTypes.TOP_WHEEL,
]);

// To be used by the Listener API
// const continuousEvents = new Set([
//   DOMTopLevelEventTypes.TOP_ABORT,
//   DOMTopLevelEventTypes.TOP_ANIMATION_END,
//   DOMTopLevelEventTypes.TOP_ANIMATION_ITERATION,
//   DOMTopLevelEventTypes.TOP_ANIMATION_START,
//   DOMTopLevelEventTypes.TOP_CAN_PLAY,
//   DOMTopLevelEventTypes.TOP_CAN_PLAY_THROUGH,
//   DOMTopLevelEventTypes.TOP_DURATION_CHANGE,
//   DOMTopLevelEventTypes.TOP_EMPTIED,
//   DOMTopLevelEventTypes.TOP_ENCRYPTED,
//   DOMTopLevelEventTypes.TOP_ENDED,
//   DOMTopLevelEventTypes.TOP_ERROR,
//   DOMTopLevelEventTypes.TOP_GOT_POINTER_CAPTURE,
//   DOMTopLevelEventTypes.TOP_LOAD,
//   DOMTopLevelEventTypes.TOP_LOADED_DATA,
//   DOMTopLevelEventTypes.TOP_LOADED_METADATA,
//   DOMTopLevelEventTypes.TOP_LOAD_START,
//   DOMTopLevelEventTypes.TOP_LOST_POINTER_CAPTURE,
//   DOMTopLevelEventTypes.TOP_PLAYING,
//   DOMTopLevelEventTypes.TOP_PROGRESS,
//   DOMTopLevelEventTypes.TOP_SEEKING,
//   DOMTopLevelEventTypes.TOP_STALLED,
//   DOMTopLevelEventTypes.TOP_SUSPEND,
//   DOMTopLevelEventTypes.TOP_TIME_UPDATE,
//   DOMTopLevelEventTypes.TOP_TRANSITION_END,
//   DOMTopLevelEventTypes.TOP_WAITING,
// ]);

export function getEventPriorityForPluginSystem(
  topLevelType: TopLevelType,
): EventPriority {
  if (discreteEvents.has(topLevelType)) {
    return DiscreteEvent;
  }
  if (userBlockingEvents.has(topLevelType)) {
    return UserBlockingEvent;
  }
  // If it is not either of the above, then we
  // default to a ContinuousEvent. Note: we might
  // want to warn if we can't detect the priority
  // for the event.
  return ContinuousEvent;
}
