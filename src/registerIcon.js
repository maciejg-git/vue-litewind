export default function registerIcon(app, icons, options) {
  let vendorPrefix =
    options && options.vendorPrefix !== undefined
      ? options.vendorPrefix
      : true;

  let iconSuffix =
    options && options.iconSufix !== undefined ? options.iconSufix : false;

  icons.forEach((i) => {
    let vendor = vendorPrefix ? i.$_icon.vendor : ""
    let suffix = iconSuffix ? "Icon" : "";
    app.component(`${vendor}${i.$_icon.name}${i.$_icon.type}${suffix}`, i);
  });
}
