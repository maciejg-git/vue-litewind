<template>
  <teleport to="body">
    <v-notify-container
      order="new-on-bottom"
      :auto-dismiss-delay="2000"
      class="bottom-4 right-10 w-[350px] space-y-4"
      :notify="{
        modNotify: 'variant:info',
        closeButton: { modCloseButton: 'size:small' },
      }"
    >
      <!-- <template #default="{ id, text }"> -->
      <!--   slot {{ id }} -->
      <!--   slot {{ text }} -->
      <!-- </template> -->
      <!-- <template #content="{text}"> -->
      <!--   slots {{ text }} -->
      <!-- </template> -->
      <!-- <template #header="{header}"> -->
      <!--   slot {{ header }} -->
      <!-- </template> -->
      <template #content-append><v-button class="mt-2">button</v-button></template>
    </v-notify-container>
  </teleport>

  <v-button
    @click="
      notify.push('Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen')
    "
  >
    Show notify
  </v-button>

  <v-button
    @click="
      notify.push({
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen',
        header: 'Header',
        icon: 'b-check-lg',
        dismissable: true,
        autoDismissDelay: 4000,
        props: { modNotify: 'variant:info', modIcon: 'variant:info' },
        options: {
          item: 'item',
        }
      })
    "
  >
    Show notify
  </v-button>
</template>

<script setup>
import { useNotify } from "../../components/composition/use-notify";

let notify = useNotify();
</script>
