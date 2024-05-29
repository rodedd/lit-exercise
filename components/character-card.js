import { LitElement, html, css } from "lit-element";

class CharacterCard extends LitElement {

  static get styles() {
    return css`
      .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid #000;
        border-radius: 10px;
        padding: 15px;
      }
      
      .card h3 {
        margin-top: 0;
      }

      .card img {
        width: 100%;
        max-width: 250px;
      }
    `;
  }

  static get properties() {
    return {
      character: { type: Object }
    };
  }

  render() {
    return html`
      <div class='card'>
        <h3>${this.character.name}</h3>
          <img src="${this.character.image}" alt="${this.character.name}" />
      </div>
    `;
  }
}

customElements.define('character-card', CharacterCard);