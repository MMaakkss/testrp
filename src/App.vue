<template>
  <div class="wrapper">
    <div class="container">
      <div class="nav">
        <div class="nav__list">
          <div
            class="nav__item"
            @click="selectCategory($event, item.category)"
            v-for="item in categories"
            :key="item.category"
          >
            <img
              :src="'src/assets/img/icons/' + item.imageID + '.svg'"
              alt="dance"
            />
            <div class="item__title">{{ item.animTitle }}</div>
          </div>
        </div>
      </div>
      <div class="separator"></div>
      <div class="animations">
        <div class="search">
          <input
            type="text"
            placeholder="Поиск по названию"
            class="search__input"
            v-model="inputValue"
          />
          <img
            class="search__icon"
            src="src/assets/img/icons/search.svg"
            alt="search"
          />
        </div>
        <h2 class="animations__title">Анимации</h2>
        <div class="animations__list-wrap">
          <div class="animations__list">
            <template v-if="list.length">
              <div
                @dragstart="onDragStart($event, item)"
                class="item"
                draggable="true"
                v-for="item in list"
                :key="item.animID"
              >
                <div class="item__icon">
                  <img
                    :src="'src/assets/img/icons/' + item.imageID + '.svg'"
                    alt="dance"
                  />
                </div>
                <div class="item__title">{{ item.animTitle }}</div>
                <div class="item__description">Робот</div>
              </div>
            </template>
            <template v-else>
              <div class="no-anim">Нет Анимаций</div>
            </template>
          </div>
        </div>
        <div class="animations__fast">
          <h2 class="title">Быстрый доступ</h2>
          <div class="description">
            Для добавления анимации в быстрый доступ - зажмите ЛКМ и перетащите
            анимацию в нужную ячейку
          </div>
          <div
            class="animations__fast-list"
            @drop="onDragDrop($event)"
            @dragover.prevent
            @dragenter.prevent
          >
            <div class="item" v-for="n in 6">
              <div class="item__icon">
                <template v-if="fastItems[n - 1]">
                  <img
                    class="delete-icon"
                    src="src/assets/img/icons/close.svg"
                    alt="delete"
                    @click="deleteItem(n - 1)"
                  />
                  <img
                    :src="
                      'src/assets/img/icons/' +
                      fastItems[n - 1]?.imageID +
                      '.svg'
                    "
                    alt="dance"
                  />
                </template>
                <template v-else>
                  <div class="border"></div>
                  <div class="border"></div>
                  <div class="border"></div>
                  <div class="border"></div>
                </template>
                <div class="counter">{{ n }}</div>
              </div>
              <template v-if="fastItems[n - 1]">
                <div class="item__title">{{ fastItems[n - 1]?.animTitle }}</div>
                <div class="item__description">Робот</div>
              </template>
              <template v-else>
                <div class="item__title">Анимация</div>
                <div class="item__description">Отсутствует</div>
              </template>
            </div>
          </div>
          <div class="animations__fast-close">
            <span>ESC</span> - Закрыть окно
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, watch } from "vue";

const store = useStore();

//getting all anim
let list = ref(store.getters.getAnimList);

//getting categories for nav
let categories = store.getters.categoriesList;

//getting fastItems
const fastItems = ref([]);

if (localStorage.getItem("fastItems")) {
  const items = localStorage.getItem("fastItems");
  fastItems.value = JSON.parse(items);
}

//drag and drop
const onDragStart = (e, item) =>
  e.dataTransfer.setData("item", JSON.stringify(item));

const onDragDrop = (e) => {
  const item = e.dataTransfer.getData("item");
  if (fastItems.value.length <= 5) {
    fastItems.value.push(JSON.parse(item));
    updateLocalStorage();
  }
};

const deleteItem = (id) => {
  fastItems.value.splice(id, 1);
  updateLocalStorage();
};

const updateLocalStorage = () =>
  localStorage.setItem("fastItems", JSON.stringify(fastItems.value));
//--------//

//getting animations filtered by the entered value
let inputValue = ref("");

watch(inputValue, () => {
  if (inputValue.value !== "") {
    list.value = store.getters.getSortedList(inputValue.value);

    //reset selected category
    selectedCategory = "all";
  } else list.value = store.getters.getAnimList;
});

//selected category is necessary to show all animations when you click on the same animation again
let selectedCategory = "all";

//filter by category
const selectCategory = (e, category) => {
  //activate item
  toggleCategory(e);

  if (selectedCategory === category) {
    list.value = store.getters.getSelectedCategories("all");
    selectedCategory = "all";
    return;
  }

  list.value = store.getters.getSelectedCategories(category);
  selectedCategory = category;

  //reset input value
  inputValue.value = "";
};

//add active class to the selected category
let toggledCategory;

const toggleCategory = (e) => {
  let item = e.target.closest(".nav__item");

  if (item.classList.value.includes("_active"))
    return item.classList.remove("_active");

  if (toggledCategory) toggledCategory.classList.remove("_active");

  item.classList.add("_active");
  toggledCategory = item;
};
</script>

<style lang="scss" scoped>
@mixin scrollbar {
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #2bd9d9;
  }

  &::-webkit-scrollbar-track {
    background: rgba(229, 255, 255, 0.07);
  }
}

.wrapper {
  max-width: 1600px;
  height: 100%;
  margin: auto;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100%;
    width: 100vw;
    background: rgb(19, 26, 27);
    opacity: 0.95;
  }

  .container {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    float: right;
    height: 100%;
    position: relative;

    @media (max-width: 992px) {
      width: 100%;
    }

    @media (max-width: 495px) {
      flex-direction: column;
      justify-content: unset;
    }

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(
        270deg,
        #131a1b 0%,
        #131a1b 50%,
        rgba(19, 26, 27, 0) 100%
      );
      opacity: 0.95;

      @media (max-width: 495px) {
        background: rgb(19 26 27);
      }
    }

    .nav {
      max-height: 100%;
      margin: auto 0;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;

      @include scrollbar;

      &__list {
        height: fit-content;
        padding: 45px 0;

        @media (max-width: 495px) {
          display: flex;
          gap: 10px;
          padding: 0;
          overflow: auto;

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }

      @media (max-width: 495px) {
        margin: 0;
        padding: 30px 20px 10px;
        overflow: unset;

        &::-webkit-scrollbar {
          display: none;
        }
      }

      &__item {
        width: 150px;
        padding: 10px 3px;
        margin-top: 30px;
        font-size: 12px;
        text-align: center;
        color: rgba(229, 255, 255, 0.4);
        cursor: pointer;

        @media (max-width: 495px) {
          min-width: 110px;
          margin-top: 0;
        }

        &._active {
          color: #e5ffff;
          background-image: linear-gradient(
            to right,
            transparent,
            #dce7e91c,
            transparent
          );
          background-size: 150px 100%;
          background-position: 50% 100%;
          background-repeat: no-repeat;
          position: relative;

          @media (max-width: 495px) {
            background-image: none;
          }
        }

        &:first-child {
          margin-top: 0;
        }

        &__title {
          margin-top: 2px;
        }
      }
    }

    .separator {
      width: 2px;
      background: linear-gradient(
        180deg,
        rgba(229, 255, 255, 0) 0%,
        #e5ffff 50%,
        rgba(229, 255, 255, 0) 100%
      );

      @media (max-width: 495px) {
        display: none;
      }
    }

    .animations {
      height: 100%;
      padding: 18px 5px 20px 20px;
      position: relative;
      overflow: auto;

      @media (max-width: 495px) {
        &::-webkit-scrollbar {
          display: none;
        }
      }

      .search {
        position: relative;
        margin-bottom: 11px;
        margin-right: 15px;

        &__input {
          width: 100%;
          padding: 12px 9px;
          color: #e5ffff;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.03);

          &:focus {
            outline: none;
          }

          &::placeholder {
            color: rgba(229, 255, 255, 0.29);
          }
        }

        &__icon {
          position: absolute;
          top: 50%;
          right: 9px;
          transform: translateY(-50%);
        }
      }

      &__title {
        font-size: 14px;
        text-align: center;
        padding-right: 15px;
        margin-bottom: 15px;
      }

      &__list-wrap {
        height: 50%;
        margin-bottom: 20px;
      }

      &__list {
        width: 303px;
        max-height: 100%;
        padding-right: 13px;
        overflow: auto;

        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        @media (max-width: 495px) {
          width: unset;
        }

        .no-anim {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .item {
          width: 31%;
          max-width: 96px;
          text-align: center;
          cursor: pointer;

          @media (max-width: 495px) {
            max-width: unset;
          }

          @media (max-width: 330px) {
            width: calc(50% - 5px);
          }

          &__icon {
            width: 76px;
            height: 76px;
            margin: 0 auto 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(19, 26, 27, 0.7);

            @media (max-width: 330px) {
              width: 90px;
              height: 80px;
              background: rgba(19, 26, 27, 0.71);
            }
          }

          &__title {
            font-weight: 600;
            font-size: 10px;
          }

          &__description {
            font-size: 8px;
            line-height: 12px;
            color: rgba(229, 255, 255, 0.4);
          }
        }

        @include scrollbar;
      }

      &__fast {
        padding-right: 15px;

        .title {
          font-size: 14px;
          text-align: center;
          margin-bottom: 5px;
        }

        .description {
          max-width: 280px;
          text-align: center;
          font-size: 12px;
          color: rgba(229, 255, 255, 0.2);
          margin: auto auto 15px;
        }

        &-list {
          width: 288px;

          display: flex;
          flex-wrap: wrap;
          gap: 10px;

          @media (max-width: 495px) {
            width: unset;
          }

          .item {
            width: 31%;
            max-width: 96px;
            text-align: center;

            @media (max-width: 495px) {
              max-width: unset;
            }

            @media (max-width: 330px) {
              width: calc(50% - 5px);
            }

            &__icon {
              width: 76px;
              height: 76px;
              margin: 0 auto 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(19, 26, 27, 0.7);
              position: relative;

              @media (max-width: 330px) {
                width: 90px;
                height: 80px;
              }

              .counter {
                position: absolute;
                right: 8px;
                bottom: 8px;
                font-style: italic;
                font-size: 18px;
                font-weight: 600;
                color: rgba(229, 255, 255, 0.15);
              }

              .delete-icon {
                position: absolute;
                right: 5px;
                top: 5px;
                cursor: pointer;
              }

              .border {
                position: absolute;

                &:first-child {
                  top: 0;
                  left: 0;
                  right: 0;
                  height: 1px;
                  z-index: 2;
                  background: linear-gradient(
                    to top left,
                    #2bd9d98c 0%,
                    #131a1b 50%
                  );
                }

                &:nth-child(2) {
                  top: 0;
                  bottom: 0;
                  right: 0;
                  width: 1.5px;
                  background: linear-gradient(
                    to bottom left,
                    #2bd9d98c 0%,
                    #131a1b 50%
                  );
                }

                &:nth-child(3) {
                  top: 0;
                  bottom: 0;
                  left: 0;
                  width: 1.5px;
                  background: linear-gradient(
                    to top left,
                    #2bd9d98c 0%,
                    #131a1b 50%
                  );
                }

                &:nth-child(4) {
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 1px;
                  z-index: 2;
                  background: linear-gradient(
                    to top right,
                    #2bd9d98c 0%,
                    #131a1b 50%
                  );
                }
              }
            }

            &__title {
              font-weight: 600;
              font-size: 10px;
            }

            &__description {
              font-size: 8px;
              line-height: 12px;
              color: rgba(229, 255, 255, 0.4);
            }
          }
        }

        &-close {
          font-size: 12px;
          font-style: italic;
          text-align: center;
          color: rgba(229, 255, 255, 0.2);
          margin-top: 5px;

          @media (max-width: 992px) {
            display: none;
          }

          span {
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            color: rgba(229, 255, 255, 0.4);
          }
        }
      }
    }
  }
}
</style>
