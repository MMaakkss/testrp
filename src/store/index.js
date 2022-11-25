import { createStore } from "vuex";

export default createStore({
  state: {
    animations: [
      {
        imageID: "dance",
        animID: "dance1",
        animTitle: "Танцы",
        category: "dance",
      },
      {
        imageID: "walk",
        animID: "walk1",
        animTitle: "Стиль походки",
        category: "walk",
      },
      {
        imageID: "actions",
        animID: "actions1",
        animTitle: "Действия",
        category: "actions",
      },
      {
        imageID: "social",
        animID: "social1",
        animTitle: "Социальные",
        category: "social",
      },
      {
        imageID: "exercise",
        animID: "exercise1",
        animTitle: "Физ.упражнения",
        category: "exercise",
      },
      {
        imageID: "emotions",
        animID: "emotions1",
        animTitle: "Эмоции",
        category: "emotions",
      },
      {
        imageID: "stance",
        animID: "stance1",
        animTitle: "Стойки",
        category: "stance",
      },
      {
        imageID: "indecent",
        animID: "indecent1",
        animTitle: "Неприличные",
        category: "indecent",
      },
      {
        imageID: "indecent",
        animID: "indecent2",
        animTitle: "Неприличные",
        category: "indecent",
      },
      {
        imageID: "dance",
        animID: "dance2",
        animTitle: "Танцы",
        category: "dance",
      },
      {
        imageID: "walk",
        animID: "walk2",
        animTitle: "Стиль походки",
        category: "walk",
      },
      {
        imageID: "actions",
        animID: "actions2",
        animTitle: "Действия",
        category: "actions",
      },
      {
        imageID: "social",
        animID: "social2",
        animTitle: "Социальные",
        category: "social",
      },
      {
        imageID: "exercise",
        animID: "exercise2",
        animTitle: "Физ.упражнения",
        category: "exercise",
      },
      {
        imageID: "emotions",
        animID: "emotions2",
        animTitle: "Эмоции",
        category: "emotions",
      },
      {
        imageID: "stance",
        animID: "stance2",
        animTitle: "Стойки",
        category: "stance",
      },
      {
        imageID: "indecent",
        animID: "indecent3",
        animTitle: "Неприличные",
        category: "indecent",
      },
      {
        imageID: "dance",
        animID: "dance3",
        animTitle: "Танцы",
        category: "dance",
      },
      {
        imageID: "walk",
        animID: "walk3",
        animTitle: "Стиль походки",
        category: "walk",
      },
      {
        imageID: "actions",
        animID: "actions3",
        animTitle: "Действия",
        category: "actions",
      },
      {
        imageID: "social",
        animID: "social3",
        animTitle: "Социальные",
        category: "social",
      },
      {
        imageID: "exercise",
        animID: "exercise3",
        animTitle: "Физ.упражнения",
        category: "exercise",
      },
      {
        imageID: "emotions",
        animID: "emotions3",
        animTitle: "Эмоции",
        category: "emotions",
      },
      {
        imageID: "stance",
        animID: "stance3",
        animTitle: "Стойки",
        category: "stance",
      },
      {
        imageID: "indecent",
        animID: "indecent4",
        animTitle: "Неприличные",
        category: "indecent",
      },
      {
        imageID: "dance",
        animID: "dance4",
        animTitle: "Танцы",
        category: "dance",
      },
      {
        imageID: "walk",
        animID: "walk4",
        animTitle: "Стиль походки",
        category: "walk",
      },
      {
        imageID: "actions",
        animID: "actions4",
        animTitle: "Действия",
        category: "actions",
      },
      {
        imageID: "social",
        animID: "social4",
        animTitle: "Социальные",
        category: "social",
      },
      {
        imageID: "exercise",
        animID: "exercise4",
        animTitle: "Физ.упражнения",
        category: "exercise",
      },
      {
        imageID: "emotions",
        animID: "emotions4",
        animTitle: "Эмоции",
        category: "emotions",
      },
      {
        imageID: "stance",
        animID: "stance4",
        animTitle: "Стойки",
        category: "stance",
      },
      {
        imageID: "indecent",
        animID: "indecent5",
        animTitle: "Неприличные",
        category: "indecent",
      },
    ],
  },
  getters: {
    getAnimList(state) {
      return state.animations;
    },
    categoriesList(state) {
      return state.animations.reduce(
        (category, elem) => {
          if (category.map[elem.category]) return category;

          category.map[elem.category] = true;
          category.categories.push(elem);

          return category;
        },
        { map: {}, categories: [] }
      ).categories;
    },
    getSortedList: (state) => (data) =>
      state.animations.filter((elem) =>
        elem.animTitle.toLowerCase().includes(data.toLowerCase())
      ),
    getSelectedCategories: (state) => (category) => {
      if (category === "all") return state.animations;

      return state.animations.filter((elem) =>
        elem.category.includes(category)
      );
    },
  },
});
