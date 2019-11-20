import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout";
import "./aspen-avatar";
/**
 * `aspen-avatar-tray`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class AspenAvatarTray extends PolymerElement {
  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      /**
       * An array of URLs for the avatars
       */
      model: {
        type: Array,
        value: []
      },

      /**
       * An array of avatar URLs to be displayed.
       */
      visibleAvatars: {
        type: Array,
        computed: "_computeVisibleAvatars(model)"
      },

      /**
       * The maximum number of avatars to display.
       */
      max: {
        type: Number,
        value: 3
      },

      /**
       * A computed property used to display the number of undisplayed avatars.
       */
      leftover: {
        type: Number,
        computed: "_computeLeftOver(model, max)"
      }
    };
  }

  static get template() {
    return html`
      <style is="custom-style">
        .avatartray asp-avatar ::content .photo {
          width: 32px;
          height: 32px;
        }

        .avatartray asp-avatar ::content .photo.null {
          width: 24px;
          height: 24px;
          padding: 4px;
        }

        .avatartray {
          vertical-align: bottom;
          width: 100%;
          min-height: var(--avatar-height, 25px);
          @apply --layout-flex;
          @apply --layout-horizontal;
        }

        .avatartray > asp-avatar {
          float: left;
        }

        .additional {
          color: var(--avatar-tray-text-color, #17aacf);
          vertical-align: bottom;
          padding-top: 6px;
        }
      </style>

      <template>
        <div class="layout horizontal">
          <div class="avatartray">
            <template is="dom-repeat" items="[[visibleAvatars]]" as="avatar">
              <asp-avatar url="[[avatar]]"></asp-avatar>
            </template>
            <div class="additional">{{leftover}}</div>
          </div>
        </div>
      </template>
    `;
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * This method creates an array of avatar URLs to be displayed.
   * @param model an array of URLs for the avatars
   */
  _computeVisibleAvatars(model) {
    model = model ? model : [];
    var avatars = model.slice(0, this.max);
    return avatars;
  }

  /**
   * This method computes the number of undisplayed avatars.
   * @param model an array of URLs for the avatars
   * @param max the maximum number of avatars to display
   */
  _computeLeftOver(model, max) {
    var leftover = "";
    if (model.length > max) {
      leftover = "+" + (model.length - max);
    }
    return leftover;
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
  }
}

customElements.define("aspen-avatar-tray", AspenAvatarTray);
