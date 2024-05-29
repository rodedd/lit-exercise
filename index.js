import { LitElement, html, css } from "lit-element";
import './components/character-card';

class HomePage extends LitElement {
  static get styles() {
    return css`
      .container {
        padding: 20px;
      }

      .card-container{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        grid-gap: 1rem;
      }

      .card-buttons-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
      }

      .card-button {
        width: 100px;
        padding: 10px 6px;
        background-color: #fff;
        border-radius: 10px;
        cursor: pointer;
      }
    `;
  };

  static get properties() {
    return {
      characters: { type: Array }
    };
  };

  constructor() {
    super();
    this.characters = [];
    this.apiUrl = 'https://rickandmortyapi.com/api/character';
    this.prevPageUrl = null;
    this.nextPageUrl = null;
  };

  async getCharacters(url) {
    const response = await fetch(url);
    const data = await response.json();
    this.characters = data.results;
    this.prevPageUrl = data.info.prev ? data.info.prev : null;
    this.nextPageUrl = data.info.next ? data.info.next : null;
  };

  firstUpdated() {
    this.getCharacters(this.apiUrl);
  }

  changePage(value) {
    this.getCharacters(value === 'next' ? this.nextPageUrl : this.prevPageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    return html`
      <div class='container'>
        <h1>Rick & Morty API w/ LitElement!</h1>
        <div class='card-container'>
          ${
            this.characters.map(character => html`<character-card .character='${character}'></character-card>`)
          }
        </div>
        <div class='card-buttons-container'>
            <button @click='${() => this.changePage('prev')}' class='card-button' ?disabled='${!this.prevPageUrl}'>< Previous</button>
            <button @click='${() => this.changePage('next')}' class='card-button' ?disabled='${!this.nextPageUrl}'>Next ></button>
        </div>
      </div>
    `;
  };
};

customElements.define("home-page", HomePage);