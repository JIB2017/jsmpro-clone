const schema = {
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      require,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "downloadLink",
      title: "DownloadLink",
      type: "url",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "views",
      title: "Views",
      type: "number",
      initialValue: 0,
    },
    {
      name: "poster",
      title: "Poster",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["frontend", "backend", "next 13", "fullstack", "other"],
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export default schema;
