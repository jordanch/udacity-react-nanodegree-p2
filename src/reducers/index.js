import { combineReducers } from "redux";

function food(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const initialPostsState = {
  byId: {
    post1: {
      id: "post1",
      author: "user1",
      body:
        "Lorem ipsum dolor amet cardigan wolf pork belly succulents. Chartreuse lomo cronut af, vexillologist taxidermy kale chips four loko. Cronut pork belly scenester thundercats sriracha succulents air plant gluten-free freegan chartreuse cornhole chia. Hoodie poke sustainable, godard messenger bag small batch migas scenester fanny pack. Cronut letterpress crucifix flannel heirloom artisan forage kogi hexagon kombucha tattooed selfies VHS thundercats. Man braid raclette fingerstache post-ironic, lumbersexual adaptogen mixtape hell of put a bird on it small batch hoodie vaporware. Plaid viral humblebrag taxidermy.",
      comments: ["comment1", "comment2"]
    },
    post2: {
      id: "post2",
      author: "user2",
      body:
        "Hell of fanny pack pug, glossier poke swag listicle shaman lomo raw denim slow-carb everyday carry tilde. Single-origin coffee pabst man braid, photo booth coloring book tattooed kale chips deep v butcher pork belly. Craft beer snackwave kale chips sriracha +1 leggings vice humblebrag semiotics green juice. DIY echo park hot chicken woke chicharrones shaman tote bag austin deep v ugh leggings air plant. Kitsch 90's subway tile, keytar portland art party chicharrones. Everyday carry la croix blog biodiesel offal four dollar toast dreamcatcher.Meditation trust fund air plant paleo, butcher tilde meggings sartorial. Pop-up keffiyeh everyday carry kogi, taxidermy banjo man braid wolf. Succulents fanny pack cliche enamel pin four dollar toast put a bird on it sriracha food truck offal narwhal actually lyft asymmetrical. XOXO cred authentic post-ironic bicycle rights schlitz. Synth heirloom adaptogen ugh bushwick chambray kinfolk enamel pin food truck keffiyeh leggings shaman. Pitchfork crucifix food truck +1 cold-pressed.",
      comments: ["comment3", "comment4", "comment5"]
    }
  },
  allIds: ["post1", "post2"]
  //   comments: {
  //     byId: {
  //       comment1: {
  //         id: "comment1",
  //         author: "user2",
  //         comment: "....."
  //       },
  //       comment2: {
  //         id: "comment2",
  //         author: "user3",
  //         comment: "....."
  //       },
  //       comment3: {
  //         id: "comment3",
  //         author: "user3",
  //         comment: "....."
  //       },
  //       comment4: {
  //         id: "comment4",
  //         author: "user1",
  //         comment: "....."
  //       },
  //       comment5: {
  //         id: "comment5",
  //         author: "user3",
  //         comment: "....."
  //       }
  //     },
  //     allIds: ["comment1", "comment2", "comment3", "commment4", "comment5"]
  //   }
};

function posts(state = initialPostsState, action) {
  //   const { day, recipe, meal } = action;

  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  food,
  posts
});
