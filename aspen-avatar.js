import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-icon/iron-icon";
import "@aspen-elements/aspen-icons/aspen-icons";

/**
 * `aspen-avatar` This component displays a user's avatar, or a generic person icon
 *  if there isn't an avatar.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class AspenAvatar extends PolymerElement {
  static get template() {
    return html`
      <style is="custom-style">
        img {
          width: 26px;
          height: 26px;
          border-radius: 50%;
        }
        iron-icon {
          border-radius: 50%;
          --iron-icon-height: var(--avatar-height, 24px);
          --iron-icon-width: var(--avatar-width, 24px);
          border: 1px solid #909090;
          color: #909090;
        }

        .avatar-container {
          margin-left: 3px;
        }
      </style>

      <div class="avatar-container">
        <template is="dom-if" if="{{isUrlNull}}">
          <iron-icon icon="aspen:person"></iron-icon>
        </template>
        <template is="dom-if" if="{{!isUrlNull}}">
          <img src="[[url]]" on-error="_handleImageError" />
        </template>
      </div>
    `;
  }
  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      /**
       * The URL for the avatar image.
       */
      url: {
        type: String,
        notify: true,
        value: null
      },

      /**
       * Boolean property to indicate whether image
       * is available on requested url
       */
      isImageAvailable: {
        type: Boolean,
        value: true
      },

      /**
       * A computed property that determines if the URL is null.
       */
      isUrlNull: {
        type: Boolean,
        computed: "_computeUrlNull(url, isImageAvailable)"
      }
    };
  }

  /**
   * A method to handle error while fetching the image
   *
   */
  _handleImageError(e) {
    this.isImageAvailable = false;
  }

  /**
   * A method that determines if the URL is null.
   * @param url The URL for the image.
   */
  _computeUrlNull(url, isImageAvailable) {
    var isNull =
      url == null ||
      url == "" ||
      url === undefined ||
      url == "null" ||
      !isImageAvailable;
    return isNull;
  }
}

window.customElements.define("aspen-avatar", AspenAvatar);
