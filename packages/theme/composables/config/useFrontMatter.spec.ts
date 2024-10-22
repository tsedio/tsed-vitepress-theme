import {useFrontMatter} from "./useFrontMatter";

describe("useFrontMatter", () => {
  it("should return the correct api config", () => {
    const fRef: any = {
      projects: [
        {
          title: "Kit basic",
          href: "https://github.com/tsedio/tsed-getting-started",
          src: "https://tsed.io/tsed.png"
        },
        {
          title: "Kit production-ready template",
          href: "https://github.com/borjapazr/express-typescript-skeleton",
          src: "https://tsed.io/tsed.png"
        },
        {
          title: "Kit React",
          href: "https://github.com/tsedio/tsed-example-react",
          src: "https://tsed.io/react.png"
        },
        {
          title: "Kit Vue.js",
          href: "https://github.com/tsedio/tsed-example-vuejs",
          src: "https://tsed.io/vuejs.png"
        },
        {
          title: "Kit Prisma",
          href: "https://github.com/tsedio/tsed-example-prisma",
          src: "https://tsed.io/prisma-2.png"
        },
        {
          title: "Kit TypeORM",
          href: "https://github.com/tsedio/tsed-example-typeorm",
          src: "https://tsed.io/typeorm.png"
        },
        {
          title: "Kit Mongoose",
          href: "https://github.com/tsedio/tsed-example-mongoose",
          src: "https://tsed.io/mongoose.png"
        },
        {
          title: "Kit Socket.io",
          href: "https://github.com/tsedio/tsed-example-socketio",
          src: "https://tsed.io/socketio.png"
        },
        {
          title: "Kit Passport.js",
          href: "https://github.com/tsedio/tsed-example-passportjs",
          src: "https://tsed.io/passportjs.png"
        },
        {
          title: "Kit AWS",
          href: "https://github.com/tsedio/tsed-example-aws",
          src: "https://tsed.io/aws.png"
        },
        {
          title: "Kit Azure AD",
          href: "https://github.com/tsedio/tsed-example-passport-azure-ad",
          src: "https://tsed.io/azure.png"
        }
      ],
      value: undefined
    };
    fRef.value = fRef;

    expect(useFrontMatter()).toEqual(fRef);
  });
});
