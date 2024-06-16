"use client";

import dynamic from "next/dynamic";

const fontWhiteList = [
  "NotoSansKR-Regular",
  "NotoSansKR-Medium",
  "NotoSansKR-Bold",
  "UniversLTPro-BoldCond",
  "UniversLTPro-Condensed",
];

const ReactQuill = dynamic(
  () =>
    import("react-quill").then((mod) => {
      const Quill = mod.default.Quill;
      const Font = Quill.import("formats/font");
      Font.whitelist = fontWhiteList;
      Quill.register(Font, true);

      return mod;
    }),
  { ssr: false }
);

export default function Editor({
  onChange,
  defaultValue,
}: {
  onChange: any;
  defaultValue?: string;
}) {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: fontWhiteList }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],
        [{ align: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "align",
    "code",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <ReactQuill
      defaultValue={defaultValue}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
}
