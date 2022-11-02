export default function registerIcon(app, icons, options) {
  let vendorPrefix =
    options && options.vendorPrefix !== undefined ? options.vendorPrefix : true;

  let iconSuffix =
    options && options.iconSufix !== undefined ? options.iconSufix : false;

  if (Array.isArray(icons)) {
    icons.forEach((i) => {
      let vendor = vendorPrefix ? i.$_icon.vendor : "";
      let suffix = iconSuffix ? "Icon" : "";
      // let type = icons.$_icon.type
      //   .map((i) => {
      //     return i.charAt(0).toUpperCase() + i.slice(1);
      //   })
      //   .join("");

      app.component(`${vendor}${i.$_icon.name}${i.$_icon.type}${suffix}`, i);
    });
    return;
  }

  let vendor = vendorPrefix ? icons.$_icon.vendor : "";
  let suffix = iconSuffix ? "Icon" : "";
  // let type = icons.$_icon.type
  //   .map((i) => {
  //     return i.charAt(0).toUpperCase() + i.slice(1);
  //   })
  //   .join("");

  console.log(`${vendor}${icons.$_icon.name}${icons.$_icon.type}${suffix}`)
  app.component(`${vendor}${icons.$_icon.name}${icons.$_icon.type}${suffix}`, icons);
}

