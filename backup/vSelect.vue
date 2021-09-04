    // let input = (ev) => {
    //   const { target } = ev;
    //   let selected = Array.from(target.options)
    //     .filter((o) => o.selected)
    //     .map((o) => o._value);
    //   if (!target.multiple) emit("update:modelValue", selected[0]);
    //   else emit("update:modelValue", selected);
    // };

    // let localModel = ref(null);
    // watch(
    //   () => props.modelValue,
    //   () => {
    //     localModel.value = props.modelValue;
    //   }
    // );
    //
    // watch(localModel, () => {
    //   emit("update:modelValue", localModel);
    // });
