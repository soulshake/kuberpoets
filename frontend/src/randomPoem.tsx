const mask = `We wear the mask that grins and lies,
It hides our cheeks and shades our eyes,—
This debt we pay to human guile;
With torn and bleeding hearts we smile,
And mouth with myriad subtleties.

Why should the world be over-wise,
In counting all our tears and sighs?
Nay, let them only see us, while
       We wear the mask.

We smile, but, O great Christ, our cries
To thee from tortured souls arise.
We sing, but oh the clay is vile
Beneath our feet, and long the mile;
But let the world dream otherwise,
       We wear the mask!`;

const poetry = `I too, dislike it: there are things that are important beyond all this fiddle.
   Reading it, however, with a perfect contempt for it, one discovers that there is in
   it after all, a place for the genuine.
      Hands that can grasp, eyes
      that can dilate, hair that can rise
         if it must, these things are important not because a

for inspection, imaginary gardens with real toads in them, shall we have
   it. In the meantime, if you demand on the one hand, in defiance of their opinion—
   the raw material of poetry in
      all its rawness, and
      that which is on the other hand,
         genuine, then you are interested in poetry.`;

const poems = [mask, poetry];

export default function getRandom() {
  return poems[(Math.random() * poems.length) | 0];
  // return mask;
}
