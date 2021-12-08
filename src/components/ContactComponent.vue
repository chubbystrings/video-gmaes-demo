<template>
  <div class="contact-wrapper">
    <div class="contact-info">
      <div class="contact-header">
        <h2>GET IN TOUCH</h2>
        <small>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
          deleniti, quibusdam optio harum ipsum nostrum porro eveniet velit enim
          dolorem atque aperiam
        </small>
      </div>
      <div class="contact-card">
        <div class="contact-inputs">
          <div>
            <label for="name">Name*</label>
            <input type="text" id="name" name="name" />
          </div>

          <div>
            <label for="email" >Email Address*</label>
            <input type="text" id="email" name="email" />
          </div>
        </div>
        <div class="contact-message">
          <label>Message*</label>
          <textarea row="5"></textarea>
        </div>
        <div>
          <button>Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useContext } from "@/store";

export default defineComponent({
  setup() {
    const { state } = useContext();

    return { state };
  },
});
</script>
<style scoped>
.contact-wrapper {
  display: grid;
  place-items: center;
  width: 100%;
  height: 70vh;
  box-sizing: border-box;
  font-family: Mulish;
}
.contact-info {
  width: 45%;
  display: grid;
  row-gap: 40px;
}
.contact-card {
  padding: 20px;
  background: var(--card);
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  height: 230px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.contact-card label {
    font-size: 10px;
}

.contact-wrapper input,
.contact-wrapper textarea {
  background: var(--input);
  display: block;
  width: 100%;
  border: none;
  outline: none;
  margin: 5px 0px;
  color: #ffffff;
}

.contact-wrapper input {
  height: 30px;
}

.contact-wrapper textarea {
  height: 70px;
}

.contact-card button {
  width: 60px;
  height: 40px;
  color: #ffffff;
  background-color: var(--button);
  border: none;
  cursor: pointer;
  transition: 0.6s;
  position: absolute;
  bottom: 25px;
  right: 17px;
}

.contact-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 50px;
  width: 100%;
}

.contact-message {
  width: 100%;
}

@media only screen and (min-width: 1024px) {
  .contact-card label {
    font-size: 15px;
  }
}

@media only screen and (min-width: 427px) and (max-width: 725px) {
  .contact-info {
    width: 75%;
  }

}

@media only screen and (min-width: 250px) and (max-width: 426px) {
  .contact-info {
    width: 95%;
  }

  .contact-info h2{
    font-size: 16px;
  }

}
</style>
