<template>
  <div class="filter-card">
    <div class="title">Filter Results</div>
    <form class="filter-form">
      <label>Name (contains)</label>
      <input v-model="name" type="text" placeholder="Text string" />
      <div class="inputs-div">
        <div>
          <label>Minimum Score</label>
          <input
            v-model="score"
            type="number"
            placeholder="1-100"
            min="1"
            max="100"
          />
        </div>
        <div>
          <label>Order By</label>
          <div class="dropdown"></div>
          <div class="arrow-div">
            <div class="arrow" @click="handleSortType">
              <svg
                v-if="sortAsc"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 172 172"
                style="fill: #000000"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#ffffff">
                    <path
                      d="M86,20.99609l-50.67057,50.67057l10.75,10.75l32.75391,-32.75391v100.83724h14.33333v-100.83724l32.7539,32.75391l10.75,-10.75z"
                    ></path>
                  </g>
                </g>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 172 172"
                style="fill: #000000"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none"></path>
                  <g fill="#ffffff">
                    <path
                      d="M82.08163,170.30688c0.0215,0.0215 0.04838,0.02687 0.06987,0.04837c0.043,0.043 0.08063,0.08063 0.12363,0.12363c0.0215,0.0215 0.02688,0.04837 0.04838,0.06988c0.24725,0.2365 0.55362,0.34938 0.83312,0.52675c0.23112,0.1505 0.42462,0.344 0.67725,0.45687c0.02688,0.01075 0.04838,0.03763 0.07525,0.04837c0.02688,0.01075 0.05375,0.00538 0.08063,0.01613c0.63962,0.258 1.32225,0.40312 2.01025,0.40312c0.688,0 1.37062,-0.14513 2.01563,-0.4085c0.02687,-0.01075 0.05375,-0.00538 0.08062,-0.01612c0.02688,-0.01075 0.04838,-0.03763 0.07525,-0.04838c0.25263,-0.11288 0.44612,-0.30637 0.67725,-0.45687c0.2795,-0.17738 0.58588,-0.29025 0.83313,-0.52675c0.0215,-0.0215 0.02687,-0.04837 0.04837,-0.06988c0.043,-0.043 0.08062,-0.08062 0.12363,-0.12362c0.0215,-0.0215 0.04837,-0.02687 0.06988,-0.04838l53.75,-57.21687c2.03175,-2.16075 1.92425,-5.56312 -0.2365,-7.60025c-2.15537,-2.02638 -5.55775,-1.91887 -7.60025,0.2365l-44.462,47.33225v-147.67812c0,-2.967 -2.408,-5.375 -5.375,-5.375c-2.967,0 -5.375,2.408 -5.375,5.375v147.67813l-44.45662,-47.32687c-2.03175,-2.16612 -5.43412,-2.26825 -7.60025,-0.2365c-2.16612,2.03175 -2.26825,5.43413 -0.2365,7.60025z"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <select v-model="sortBy">
              <option value="date">Release Date</option>
              <option value="score">Score</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
        <button @click.prevent="handleClick">Clear</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import {
  clearFilter,
  filter,
  openSearchLoader,
  closeSearchLoader,
} from "@/store/actions";
import { useContext } from "@/store";

export default defineComponent({
  setup() {
    const { state, dispatch } = useContext();

    const name = ref("");
    const score = ref(1);
    const sortBy = ref("date");
    const sortType = ref("asc");
    const sortAsc = ref(true);

    const handleClick = () => {
      name.value = "";
      score.value = 1;
      sortBy.value = "";
      sortType.value = "asc";

      dispatch(clearFilter());
    };

    const handleSortType = () => {
     sortAsc.value = !sortAsc.value
     if (sortAsc.value) {
       sortType.value = 'asc'
     } else {
       sortType.value = 'desc'
     }
    } 

    const handleFilter = () => {
      dispatch(
        filter({
          name: name.value,
          score: score.value,
          sortBy: sortBy.value,
          sortType: sortType.value,
        })
      );
    };

    let timer: number;
    watch([name, score, sortBy, sortType], () => {
      dispatch(openSearchLoader());
      clearTimeout(timer);
      timer = setTimeout(() => {
        handleFilter();
      }, 2000);
    });

    return {
      name,
      score,
      sortType,
      sortBy,
      handleClick,
      handleSortType,
      sortAsc,
    };
  },
});
</script>
<style scoped>
.filter-card {
  width: 100%;
  height: 360px;
  border-radius: 2px;
  background-color: #0e1a2b;
  color: #ffffff;
  padding: 10px 2px 10px 10px;
  box-sizing: border-box;
}
.title {
  font-weight: 600;
  margin-bottom: 30px;
}
.filter-form label {
  display: block;
  margin-bottom: 7px;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
}
.filter-form input {
  background: #182c47;
  border: none;
  outline: 1px solid #182c47;
  color: #ffffff;
  width: 95%;
  height: 40px;
  margin-bottom: 20px;
}

.filter-form select {
  background: #182c47;
  border: none;
  outline: 1px solid #182c47;
  color: #ffffff;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
}

.filter-form input::placeholder {
  color: #7f8fa6;
}

.filter-form button {
  width: 300px;
  height: 40px;
  color: #ffffff;
  background-color: #5692e8;
  border: none;
  cursor: pointer;
  transition: 0.6s;
}
.filter-form button:hover {
  /* background-color: #fff;
  color: #182c47; */
  font-family: "Montserrat", sans-serif;
}
.dropdown {
  display: flex;
}
.arrow-div {
  display: flex;
  width: 95%;
}
.arrow {
  background-color: #5692e8;
  width: 45px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
}
.arrow:hover {
  filter: brightness(70%);
}
.arrow img {
  color: white;
  width: 20px;
  height: 20px;
}

@media only screen and (min-width: 1024px) {
  .filter-card {
    width: 270px;
    position: relative;
  }
  .filter-form > input {
    width: 95%;
  }
  .inputs-div input {
    width: 95%;
  }
  .filter-form select {
    width: 95%;
  }
  .filter-form button {
    width: 100px;
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
}

@media only screen and (min-width: 726px) and (max-width: 1023px) {
  .filter-card {
    height: 300px;
  }
  .inputs-div {
    display: grid;
    grid-template-columns: 3fr 4.5fr 1fr;
    align-items: center;
    column-gap: 20px;
    width: 95%;
  }
  .filter-form button {
    width: 100%;
  }
}

@media only screen and (min-width: 400px) and (max-width: 725px) {
  .filter-card {
    margin-bottom: 20px;
  }
  .link-one::before {
    left: -25px;
  }

  .inputs-div {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    column-gap: 20px;
  }

  .filter-form button {
    width: 95%;
  }
}

@media only screen and (min-width: 250px) and (max-width: 399px) {
  .filter-card {
    margin-bottom: 20px;
  }
  .link-one::before {
    left: -30px;
  }
  .filter-form button {
    width: 95%;
  }
}
</style>
