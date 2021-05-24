import Vue from "vue";
import VueRouter from "vue-router";
import Books from "@/pages/Books";
import Authors from "@/pages/Authors";
import Series from "@/pages/Series";
import EditBook from "@/pages/EditBook";
import EditAuthor from "@/pages/EditAuthor";
import EditSeries from "@/pages/EditSeries";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "hash",
  //base: "/demo/",
  routes: [
    {
      path: "/",
      name: "Books",
      component: Books,
    },
    {
      path: "/books/author/:name",
      name: "AuthorBooks",
      component: Books,
    },
    {
      path: "/books/series/:title",
      name: "SeriesBooks",
      component: Books,
    },
    {
      path: "/add-book",
      name: "AddBook",
      component: EditBook,
    },
    {
      path: "/edit-book/:id",
      name: "EditBook",
      component: EditBook,
    },
    {
      path: "/authors",
      name: "Authors",
      component: Authors,
    },
    {
      path: "/add-author",
      name: "AddAuthor",
      component: EditAuthor,
    },
    {
      path: "/edit-author/:id",
      name: "EditAuthor",
      component: EditAuthor,
    },
    {
      path: "/series",
      name: "Series",
      component: Series,
    },
    {
      path: "/add-series",
      name: "AddSeries",
      component: EditSeries,
    },
    {
      path: "/edit-series/:id",
      name: "EditSeries",
      component: EditSeries,
    },
  ],
});
