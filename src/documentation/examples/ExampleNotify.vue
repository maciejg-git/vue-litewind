<template>
  <teleport to="body">
    <v-notify-container
      order="new-on-bottom"
      :auto-dismiss-delay="2000"
      class="bottom-4 md:right-10 w-full md:w-[350px] space-y-4"
      :notify="{
        modNotify: 'variant:info',
        closeButton: { modCloseButton: 'size:small' },
      }"
    >
      <template #content-append="{ options, removeById }">
        <div
          v-if="options.dialog"
          class="mt-6 flex justify-between"
        >
          <v-button
            mod-button="size:tiny"
            @click="removeById"
          >
            Accept
          </v-button>
          <v-button
            mod-button="size:tiny variant:secondary"
            @click="removeById"
          >
            Close
          </v-button>
        </div>
      </template>
    </v-notify-container>
  </teleport>

  <p>Simple notify with default options and text argument.</p>

  <div class="flex flex-col items-start gap-y-4">
    <v-button
      @click="
        notify.push(
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        )
      "
    >
      Show simple notify
    </v-button>

    <p>Customized notify with object argument.</p>

    <v-button
      @click="
        notify.push({
          header: 'Header',
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen',
          icon: 'b-exclamation-circle',
          dismissable: true,
          autoDismissDelay: 6000,
          props: { modNotify: 'variant:warn', modIcon: 'variant:warn' },
        })
      "
    >
      Show notify
    </v-button>

    <p>Static notify that remains visible until manually dismissed.</p>

    <v-button
      @click="
        notify.push({
          header: 'Header',
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen',
          icon: 'b-check-lg',
          static: true,
        })
      "
    >
      Show static notify
    </v-button>

    <p>Notify with additional content in the slots.</p>

    <v-button
      @click="
        notify.push({
          header: 'Header',
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen',
          static: true,
          dismissable: false,
          props: { modNotify: 'variant:default' },
          options: {
            dialog: true,
          },
        })
      "
    >
      Show custom notify
    </v-button>
  </div>
</template>

<script setup>
import { useNotify } from "../../components/composition/use-notify";

let notify = useNotify();
</script>
