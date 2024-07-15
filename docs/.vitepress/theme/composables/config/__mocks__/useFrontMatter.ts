interface FrontMatterRef {
  projects: Array<{
    title: string;
    href: string;
    src: string;
  }>;
  value?: FrontMatterRef;
}

export function useFrontMatter() {
  const ref: FrontMatterRef = {
    projects: [
      {
        title: "Kit basic",
        href: "https://github.com/tsedio/tsed-getting-started",
        src: "/tsed.png"
      },
      {
        title: "Kit production-ready template",
        href: "https://github.com/borjapazr/express-typescript-skeleton",
        src: "/tsed.png"
      },
      {
        title: "Kit React",
        href: "https://github.com/tsedio/tsed-example-react",
        src: "/react.png"
      },
      {
        title: "Kit Vue.js",
        href: "https://github.com/tsedio/tsed-example-vuejs",
        src: "/vuejs.png"
      },
      {
        title: "Kit Prisma",
        href: "https://github.com/tsedio/tsed-example-prisma",
        src: "/prisma-2.png"
      },
      {
        title: "Kit TypeORM",
        href: "https://github.com/tsedio/tsed-example-typeorm",
        src: "/typeorm.png"
      },
      {
        title: "Kit Mongoose",
        href: "https://github.com/tsedio/tsed-example-mongoose",
        src: "/mongoose.png"
      },
      {
        title: "Kit Socket.io",
        href: "https://github.com/tsedio/tsed-example-socketio",
        src: "/socketio.png"
      },
      {
        title: "Kit Passport.js",
        href: "https://github.com/tsedio/tsed-example-passportjs",
        src: "/passportjs.png"
      },
      {
        title: "Kit AWS",
        href: "https://github.com/tsedio/tsed-example-aws",
        src: "/aws.png"
      },
      {
        title: "Kit Azure AD",
        href: "https://github.com/tsedio/tsed-example-passport-azure-ad",
        src: "/azure.png"
      }
    ],
    value: undefined
  };

  ref.value = ref;

  return ref;
}
