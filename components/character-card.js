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
        margin: 0;
      }

      .card img {
        width: 100%;
        max-width: 250px;
      }

      .title-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .like-icon {
        fill: none;
        cursor: pointer;
      }

      .liked {
        fill: red;
      }
    `;
  };

  static get properties() {
    return {
      character: { type: Object },
      isCharacterLiked: { type: Boolean }
    };
  };

  constructor() {
    super();
    this.character = {};
    this.isCharacterLiked = false;
  }

  updated() {
    this.isCharacterLiked = this.checkIsCharacterLiked(this.character.id);
  };

  toggleLikeCharacter(characterId) {
    const likedCharacters = JSON.parse(localStorage.getItem('LIKED_CHARACTERS')) || [];
    const characterIndex = likedCharacters.indexOf(characterId);

    if(characterIndex !== -1) {
      likedCharacters.splice(characterIndex, 1);
      this.isCharacterLiked = false;
    } else {
      likedCharacters.push(characterId);
      this.isCharacterLiked = true;
    }
    localStorage.setItem('LIKED_CHARACTERS', JSON.stringify(likedCharacters));
  };

  checkIsCharacterLiked(characterId) {
    const likedCharacters = JSON.parse(localStorage.getItem('LIKED_CHARACTERS')) || [];
    return likedCharacters.includes(characterId);
  };

  render() {
    return html`
      <div class='card'>
        <div class='title-container'>
          <h3>${this.character.name}</h3>
          <div @click='${() => this.toggleLikeCharacter(this.character.id)}'>
            <svg class='like-icon ${this.isCharacterLiked ? 'liked' : ''}' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <img src="${this.character.image}" alt="${this.character.name}" />
      </div>
    `;
  };
};

customElements.define('character-card', CharacterCard);