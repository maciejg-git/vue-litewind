<template>
  <v-navbar fixed style-navbar="default">
    <!-- <div class="p-3"> -->
      Vue
    <!-- </div> -->
  </v-navbar>
  <div class="sm:container mx-auto">
    item
    <v-tabs style-tab="default">
      <v-tab name="item" class="p-2">
        item Options can be passed via data attributes or JavaScript. For data
        attributes, append the option name to data-bs-, as in
        data-bs-animation="". Make sure to change the case type of the option
        name from camelCase to kebab-case when passing via data attributes. For
        example: instead of using data-bs-customClass="beautifier", use
        data-bs-custom-class="beautifier". Options can be passed via data
        attributes or JavaScript. For data attributes, append the option name to
        data-bs-, as in data-bs-animation="". Make sure to change the case type
        of the option name from camelCase to kebab-case when passing via data
        attributes. For example: instead of using
        data-bs-customClass="beautifier", use data-bs-custom-class="beautifier".
        item Options can be passed via data attributes or JavaScript. For data
        attributes, append the option name to data-bs-, as in
        data-bs-animation="". Make sure to change the case type of the option
        name from camelCase to kebab-case when passing via data attributes. For
        example: instead of using data-bs-customClass="beautifier", use
        data-bs-custom-class="beautifier". Options can be passed via data
        attributes or JavaScript. For data attributes, append the option name to
        data-bs-, as in data-bs-animation="". Make sure to change the case type
        of the option name from camelCase to kebab-case when passing via data
        attributes. For example: instead of using
        data-bs-customClass="beautifier", use data-bs-custom-class="beautifier".
        <v-button @click="dropdownplacement = 'bottom'">placement</v-button>
        <v-card style-card="default shadow gray" class="mb-4">
          <v-button style-button="primary small">table</v-button>
          <v-button style-button="primary small">add</v-button>
          <v-button style-button="secondary small">add</v-button>
          <v-dropdown :placement="dropdownplacement">
            <template #activator>
              <v-button style-button="primary small">add</v-button>
            </template>
            <template #default="{ hide }">
              <v-card style-card="default shadow" width="320px">
                <v-dropdown-menu-item
                  tag="button"
                  active
                  @click.prevent="log('click')"
                >
                  item
                </v-dropdown-menu-item>

          <v-dropdown placement="right-start" class="w-full">
            <template #activator>
                <v-dropdown-menu-item>item 2</v-dropdown-menu-item>
            </template>
            <template #default="{ hide }">
              <v-card>
                <v-dropdown-menu-item
                  tag="button"
                  active
                  @click.prevent="log('click')"
                >
                  item
                </v-dropdown-menu-item>
                <v-dropdown-menu-item>item 2</v-dropdown-menu-item>
                <v-dropdown-header>items</v-dropdown-header>
                <v-dropdown-menu-item disabled>item 3</v-dropdown-menu-item>
                <v-divider></v-divider>
                <v-dropdown-menu-item tag="button">item 9</v-dropdown-menu-item>
              </v-card>
            </template>
          </v-dropdown>


                <v-dropdown-header>items</v-dropdown-header>
                <v-dropdown-menu-item disabled>item 3</v-dropdown-menu-item>
                <v-divider></v-divider>
                <v-dropdown-menu-item tag="button">item 9</v-dropdown-menu-item>
              </v-card>
            </template>
          </v-dropdown>
        </v-card>
      </v-tab>
      <v-tab name="item2" class="p-2">
        <v-card style-card="default shadow gray" class="mb-4">
          <v-button style-button="primary small">table</v-button>
          <v-button style-button="primary small">add</v-button>
          <v-button style-button="secondary small">add</v-button>
          <v-dropdown auto-close-menu>
            <template #activator>
              <v-button style-button="primary small">add</v-button>
            </template>
            <template #default="{ hide }">
              <v-card style-card="default shadow" width="320px">
                <v-dropdown-menu-item
                  tag="button"
                  active
                  @click.prevent="log('click')"
                >
                  item
                </v-dropdown-menu-item>
                <v-dropdown-menu-item>item 2</v-dropdown-menu-item>
                <v-dropdown-header>items</v-dropdown-header>
                <v-dropdown-menu-item disabled>item 3</v-dropdown-menu-item>
                <v-divider></v-divider>
                <v-dropdown-menu-item tag="button">item 9</v-dropdown-menu-item>
              </v-card>
            </template>
          </v-dropdown>
        </v-card>
        <v-table
          :items="data"
          :definition="definition"
          :filter="filter"
          :itemsPerPage="itemsPerPage"
          :page="page"
          @update:filtered-count="tableItemsCount = $event"
          @update:page="page = $event"
          caption-top
        >
          <template #caption>table 4</template>
          <template #cell:item_city="{ item }">
            <v-button button="primary tiny no-margin">item</v-button>
            <!-- <span v-tooltip.right.delay200="() => item.city">{{ item.id }}</span> -->
            <!-- <v&#45;popover trigger="hover" :delay="500" transition="fade"> -->
            <!--   <template #activator> -->
            <!--     <v&#45;button>popover</v&#45;button> -->
            <!--     <a href="">item</a> -->
            <!--     <v&#45;button>popover</v&#45;button> -->
            <!--   </template> -->
            <!--   <template #header>Popover</template> -->
            <!--   {{ item.id }} -->
            <!--   <input type=""> -->
            <!-- </v&#45;popover> -->
          </template>
        </v-table>
      </v-tab>
      <v-tab :name="tabname" class="p-2">item3</v-tab>
      <v-tab name="item4" class="p-2">item 44</v-tab>
      <!-- <v&#45;tab name="item5" v&#45;if="tooltipTest"></v&#45;tab> -->
    </v-tabs>
    <v-button @click="tabname = 'item 5'">tabname</v-button>
    <v-button @click="filter = /am/">filter table</v-button>
    <v-button @click="busy = !busy">busy table</v-button>

    <v-button @click="progress += 10">progress</v-button>
    <v-progress
      :value="progress"
      :max="100"
      style-progress-bar="default gradient"
    >
      <template #default="{ value, max }">{{ value }}</template>
    </v-progress>

    <br />
    <v-progress
      :value="progress"
      :max="100"
      :label="false"
      style-progress="default tiny"
      style-progress-bar="default gradient"
    ></v-progress>

    <br>
    
    <v-progress
      :value="progress"
      :max="100"
      style-progress="default tiny"
      style-progress-bar="default gradient"
      indeterminate
      :indeterminate-width="50"
    >
      <template #default="{ value, max }">{{ value }}</template>
    </v-progress>

    {{ textModel }}
      <v-input type="text" v-model="textModel" readonly></v-input>
      <v-input type="password" v-model="textModel" :state="false"></v-input>
      <v-input type="password" v-model="textModel" state="valid"></v-input>
      <v-input type="password" v-model="textModel" state="invalid"></v-input>
      <v-input type="text" v-model="textModel" placeholder="input text"></v-input>
      <v-input type="password" v-model="textModel" disabled>
        <template #helper>input name</template>
        <template #invalid>wrong name</template>
      </v-input>
    <v-input type="password" v-model="textModel" state="invalid">
      <template #helper>input name</template>
      <template #invalid>wrong name</template>
    </v-input>
    <v-input type="range">
    </v-input>
    <v-radio v-model="textModel" value="option"></v-radio>
    <v-radio v-model="textModel" value="option 2"></v-radio>
    <v-radio v-model="textModel" value="option 3"></v-radio>
    <v-breadcrumb :path="linkItems"></v-breadcrumb>
        <v-button style-button="default noMargin" class="relative mt-4 mr-4">
          badge button
          <v-badge
              position="top-right"
            style-badge="primary red circle"
          >
          </v-badge>
        </v-button>

    <!-- <v-checkbox v-model="textModel"> -->
    <!--   <template #helper>input name</template> -->
    <!--   <template #invalid>wrong name</template> -->
    <!-- </v-checkbox> -->
    <!-- <v-checkbox v-model="textModel" state="invalid"> -->
    <!--   <template #helper>input name</template> -->
    <!--   <template #invalid>wrong name</template> -->
    <!-- </v-checkbox> -->

    <!-- <v-range v-model="textModel" min="0" max="50"> -->
    <!-- </v-range> -->

    <v-button @click="selectModel = []">reset select</v-button>
    {{ selectModel }}
    <v-select v-model="selectModel" :options="selectOptions" multiple class="w-full">
      <template #helper>select name</template>
    </v-select>
    <v-textarea v-model="textModel" rows="20" cols="40">
    </v-textarea>

    <v-button @click="alertShow = true">show alert</v-button>
    <v-alert v-model="alertShow" :dismissDelay="2000" class="my-2">item</v-alert>
    <v-alert v-model="alertShow" :dismissDelay="2000" style-alert="default info" class="my-2">item</v-alert>
    <v-alert v-model="alertShow" :dismissDelay="2000" style-alert="default danger" class="my-2">item</v-alert>
    <v-alert v-model="alertShow" :dismissDelay="2000" style-alert="default success" class="my-2">item</v-alert>
    <v-alert v-model="alertShow" :dismissDelay="2000" style-alert="default light" class="my-2">item</v-alert>

    {{ tableSelection }}
    <input v-model="filter" type="" class="form-control w-25" />
<br>

  <v-chevron></v-chevron>
   <v-button style-button="primary large">button css
     <v-chevron triangle style-chevron="right" :dir="'d'" :switch="false">
     </v-chevron>

   </v-button> 

   <v-form-text state="invalid">text form</v-form-text>

   <v-button style-button="primary small">button css</v-button> 
   <v-button style-button="primary tiny">button css</v-button> 
   <v-button style-button="primary large">button css</v-button> 

   <v-button style-button="secondary">button css</v-button> 

   <v-button>button css fa<v-icon name="chevron-right-icon"></v-icon></v-button> 
   <v-button>button css b<v-icon name="info-circle-icon"></v-icon></v-button> 
   <v-button>button css mdi<v-icon name="keyboard-tab-icon"></v-icon></v-button> 

<!-- <icon class="h-6 w-6"></icon> -->
<!-- <icon icon="keyboard"></icon> -->
<!-- <b-keyboard></b-keyboard> -->
<!-- <BKeyboard></BKeyboard> -->
<!-- <keyboardIcon></keyboardIcon> -->
<!-- <account-multiple-outline-icon></account-multiple-outline-icon> -->

<!-- <icon icon="mdi-keyboard"></icon> -->
<!-- <icon icon="fa-keyboard"></icon> -->
<!-- <b-keyboard-icon></keyboard-icon> -->
<!-- <BKeyboardIcon></KeyboardIcon> -->
<!-- <keyboardIcon></keyboardIcon> -->

<v-icon icon-type="info"></v-icon>

<!-- <pencil-icon></pencil-icon> -->
<alt-icon></alt-icon>
<align-top-icon></align-top-icon>

<ad-icon></ad-icon>
<adjust-icon></adjust-icon>

<abjad-arabic-icon></abjad-arabic-icon>
<abugida-devanagari-icon></abugida-devanagari-icon>

<align-bottom-icon></align-bottom-icon>

<div class="relative h-40 w-40">
  rel
<div class="absolute top-5 left-5">
  abs
  <div class="relative">
    <div>
      rel
    </div>
    <div>
      rel
    </div>
    <div>
      rel
    </div>
  </div>

</div>
</div>

<!-- <i-keyboard></i-keyboard> -->
   <v-button>button padding <div class="arrow-down"></div></v-button> 
   <v-close-button style-close-button="red"></v-close-button>

   <v-button :control="controlModel">test button</v-button>
   <v-button @click="controlModel = 'small'">add small</v-button>

    <v-card style-card="default shadow">
      <v-table
        :definition="definition"
        :items="data"
        :filter="filter"
        :itemsPerPage="itemsPerPage"
        :page="page"
        :busy="busy"
          :headerRows="header"
        primary-key="id"
        style-table="default fixed"
        selection-mode="single"
        @input:selection="tableSelection = $event"
        @update:filtered-count="tableItemsCount = $event"
        @update:page="page = $event"
      >
        <!-- <template #busy><v-spinner></v-spinner></template> -->
        <template #cell:item_city="{ item }">
          <!-- <v&#45;button small>item</v&#45;button> -->
          <!--     <!&#45;&#45; <v&#38;#45;button>popover</v&#38;#45;button> &#45;&#45;> -->
          <!--     <a href="">item</a> -->
          <!--     <!&#45;&#45; <v&#38;#45;button>popover</v&#38;#45;button> &#45;&#45;> -->
          <!--   </template> -->
          <!--   <!&#45;&#45; <template #header>Popover</template> &#45;&#45;> -->
          <!--   item item 2 -->
          <!--   {{ item.id }} -->
          <!--   <input type=""> -->
          <!-- </v&#45;popover> -->
        </template>
      </v-table>
    </v-card>

    <div class="grid grid-cols-2 mt-2">
      <v-pagination
        v-model="page"
        :itemsCount="tableItemsCount"
        :itemsPerPage="itemsPerPage"
        :maxPages="8"
        icons
      ></v-pagination>
      <input type="" />
    </div>

    <v-button @click="classadd = 'bg-blue-700 border-2'">classadd</v-button>
    <v-button @click="definition[3].visible = !definition[3].visible">
      visible city col
    </v-button>
    <v-button @click="data = dataJSON.slice(0, 40)">table</v-button>
    <v-button @click="definition.push({ key: 'item5' })">table push</v-button>
    <v-button @click="data[0].item5 = 6">table add col</v-button>
    <!-- <v-button style-button="bg-indigo-500 text-white p-4">class</v-button> -->

    <div class="my-2">
      spinner
      <v-spinner></v-spinner>
    </div>

    <v-button @click="data[0].item5 = 6" class="relative">badge button
      <v-badge style-badge="primary tiny red" class="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2">2</v-badge>
    </v-button>

    <v-button @click="tooltipTest = true">tooltipTest</v-button>

    <span
      v-tooltip.bottom.delay500.oY5="() => 'item item 2'"
      data-title="item item 4"
    >
      tooltip
    </span>

    <br />

    <span
      v-tooltip.top-end.delay500="() => 'item item 2'"
      data-title="item item 4"
    >
      tooltip
    </span>

    <br />

    {{ i }}
    {{ formattedDate }}
    <v-button @click="i = ['2021-05-14', '2021-05-15']">set d</v-button>
    <v-card style-card="default" class="p-2 mb-2" style="width: 320px">
      <vDatePicker
        v-model="i"
        euro
        range
        range-hover-highlight
        buttons
        adjecent-months
        style-day="default font-semibold"
      ></vDatePicker>
    </v-card>
    <v-card style-card="default" class="p-2" style="width: 320px">
      <vDatePicker
        v-model="i"
        @input:formatted="formattedDate = $event"
        euro
        range
      ></vDatePicker>
    </v-card>
    <v-card card="default" class="p-2" style="width: 320px">
      <vDatePicker
        v-model="i"
        @input:formatted="formattedDate = $event"
        euro
        buttons
      ></vDatePicker>
    </v-card>

    <v-button @click="sidepanel = !sidepanel">sidepanel</v-button>

    <v-sidepanel v-model="sidepanel" :no-header="sidepanelHeader" close-button>
      <template #header>
        <h5 class="text-xl font-semibold">Sidepanel</h5>
      </template>
      <div class="p-2">sidepanel <button @click="sidepanelHeader = !sidepanelHeader">sidepanel</button></div>
    </v-sidepanel>

    <!-- <v-dropdown transition="fade"> -->
    <!--   <template #activator> -->
    <!--     <v-button>Dropdown</v-button> -->
    <!--   </template> -->
    <!--   <template #default> -->
    <!--     <v-card style-card="default shadow"> -->
    <!--       item -->
    <!--       <v-dropdown-menu-item v-tooltip.right.delay200="'item content'" -->
    <!--         >item</v-dropdown-menu-item -->
    <!--       > -->
    <!--       <v-dropdown-menu-item>item</v-dropdown-menu-item> -->
    <!--       <div class="p-2"> -->
    <!--         <vDatePicker -->
    <!--           v-model="i" -->
    <!--           euro -->
    <!--           buttons -->
    <!--           @input:formatted="formattedDate = $event" -->
    <!--           width="320px" -->
    <!--         ></vDatePicker> -->
    <!--       </div> -->
    <!--     </v-card> -->
    <!--   </template> -->
    <!-- </v-dropdown> -->

    <!-- <v-dropdown transition="fade"> -->
    <!--   <template #activator> -->
    <!--     <v-button>Dropdown</v-button> -->
    <!--   </template> -->
    <!--   <template #default="{ hide }"> -->
    <!--     <v-card style-card="default shadow" class="p-2"> -->
    <!--         <vDatePicker -->
    <!--           v-model="i" -->
    <!--           euro -->
    <!--           buttons -->
    <!--           adjecent-months -->
    <!--           @input:formatted="formattedDate = $event" -->
    <!--           width="320px" -->
    <!--         ></vDatePicker> -->
    <!--     </v-card> -->
    <!--   </template> -->
    <!-- </v-dropdown> -->

    <!-- <v-dropdown transition="fade"> -->
    <!--   <template #activator> -->
    <!--     <vInputDate v-model="i" class="w-80"></vInputDate> -->
    <!--   </template> -->
    <!--   <template #default="{ hide }"> -->
    <!--     <v-card style-card="default shadow" class="p-2"> -->
    <!--         <vDatePicker -->
    <!--           v-model="i" -->
    <!--           euro -->
    <!--           buttons -->
    <!--           adjecent-months -->
    <!--           range -->
    <!--           @input:formatted="formattedDate = $event" -->
    <!--           @state:done="hide" -->
    <!--           @state:cancel="hide" -->
    <!--           width="320px" -->
    <!--         ></vDatePicker> -->
    <!--     </v-card> -->
    <!--   </template> -->
    <!-- </v-dropdown> -->

    <v-list width="320px">
      <v-list-item>item</v-list-item>
      <v-list-item>item2</v-list-item>
      <v-list-item>item3</v-list-item>
      <v-list-item active>item</v-list-item>
      <v-list-item>item2</v-list-item>
      <v-list-item v-tooltip.right.delay100="'item content'">item3</v-list-item>
      <v-list-item>item</v-list-item>
      <v-list-item>item2</v-list-item>
      <v-list-item>item3</v-list-item>
      <v-list-item>item3</v-list-item>
    </v-list>

    <v-button @click="i2 = !i2">collapse</v-button>
    <v-collapse v-model="i2">
      Options can be passed via data attributes or JavaScript. For data
      attributes, append the option name to data-bs-, as in
      data-bs-animation="". Make sure to change the case type of the option name
      from camelCase to kebab-case when passing via data attributes. For
      example: instead of using data-bs-customClass="beautifier", use
      data-bs-custom-class="beautifier". Options can be passed via data
      attributes or JavaScript. For data attributes, append the option name to
      data-bs-, as in data-bs-animation="". Make sure to change the case type of
      the option name from camelCase to kebab-case when passing via data
      attributes. For example: instead of using
      data-bs-customClass="beautifier", use data-bs-custom-class="beautifier".
      Options can be passed via data attributes or JavaScript. For data
      attributes, append the option name to data-bs-, as in
      data-bs-animation="". Make sure to change the case type of the option name
      from camelCase to kebab-case when passing via data attributes. For
      example: instead of using data-bs-customClass="beautifier", use
      data-bs-custom-class="beautifier". Options can be passed via data
      attributes or JavaScript. For data attributes, append the option name to
      data-bs-, as in data-bs-animation="". Make sure to change the case type of
      the option name from camelCase to kebab-case when passing via data
      attributes. For example: instead of using
      data-bs-customClass="beautifier", use data-bs-custom-class="beautifier".
    </v-collapse>

    <v-badge>new</v-badge>
    <v-button @click="modal = !modal">modal</v-button>
    <v-modal
      v-model="modal"
      position="center"
      style-modal="default rounded"
      style-content="default edge-to-edge"
      transition="fade-slide"
      secondaryButtonClose
      title="Modal"
    >
      item item Options can be passed via data attributes or JavaScript. For
      data attributes, append the option name to data-bs-, as in
      data-bs-animation="". Make sure to change the case type of the option name
      from camelCase to kebab-case when passing via data attributes. For
      example: instead of using data-bs-customClass="beautifier", use
      data-bs-custom-class="beautifier". Options can be passed via data
      attributes or JavaScript. For data attributes, append the option name to
      data-bs-, as in data-bs-animation="". Make sure to change the case type of
      the option name from camelCase to kebab-case when passing via data
      attributes. For example: instead of using
      data-bs-customClass="beautifier", use data-bs-custom-class="beautifier".
      Options can be passed via data attributes or JavaScript. For data
      attributes, append the option name to data-bs-, as in
      data-bs-animation="". Make sure to change the case type of the option name
      from camelCase to kebab-case when passing via data attributes. For
      example: instead of using data-bs-customClass="beautifier", use
      data-bs-custom-class="beautifier". Options can be passed via data
      attributes or JavaScript. For data attributes, append the option name to
      data-bs-, as in data-bs-animation="". Make sure to change the case type of
      the option name from camelCase to kebab-case when passing via data
      attributes. For example: instead of using
      data-bs-customClass="beautifier", use data-bs-custom-class="beautifier".
      <v-button v-tooltip.right.delay500.oY5="() => 'item item 2'">
        button
      </v-button>
    </v-modal>
    <v-button v-tooltip="() => 'item item 2'">button</v-button>

    <div class="my-5">
      <v-button shadow class-button="bg-gray-500 hover:bg-gray-600">
        custom button
      </v-button>
      <v-button shadow class-button="bg-red-500 hover:bg-red-600">
        custom button
      </v-button>
      <v-button class-button="bg-blue-500 hover:bg-blue-600">
        custom button
      </v-button>
      <!-- <v&#45;button :class&#45;button="[btn.primary, btn.small, btn.square]">custom button</v&#45;button> -->
      <!-- <v&#45;button :class&#45;button="[btn.secondary, btn.small, 'shadow&#45;md']">custom button</v&#45;button> -->
      <!-- <v&#45;button :class&#45;button="[btn.secondary, btn.large, 'shadow&#45;md']">custom button</v&#45;button> -->
      <!-- <v&#45;button :class&#45;button="[btn.primary, btn.pill, 'shadow&#45;md']">custom button</v&#45;button> -->
      <v-button>custom button</v-button>
      <v-button style-button="primary small">custom button</v-button>
      <v-button style-button="primary pill small">custom button</v-button>
    </div>
    <br />

    <v-popover
      trigger="click"
      :delay="0"
      click-outside-close
    >
      <template #activator>
        <input
          ref="activator"
          type="text"
          placeholder="click popover"
          class="
            p-1
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            shadow-sm
            border-gray-300
            rounded
          "
        />
      </template>
      <template #header>Popover</template>
      item item 2
      <input type="text" />
      <input type="text" />
    </v-popover>

    <br>

    <v-popover
      trigger="focus"
      :delay="0"
      click-outside-close
    >
      <template #activator>
        <input
          ref="activator"
          type="text"
          placeholder="focus popover"
          class="
            p-1
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            shadow-sm
            border-gray-300
            rounded
          "
        />
      </template>
      <template #header>Popover</template>
      item item 2
      <input type="text" />
      <input type="text" />
    </v-popover>

    <br>

    <v-button square small shadow-md @click="popoverShow = true">
      popover model true
    </v-button>
    <v-button @click="popoverShow = false">popover model false</v-button>
    <v-popover
      trigger="focus"
      :delay="0"
      click-outside-close
      v-model="popoverShow"
    >
      <template #activator>
        <input
          ref="activator"
          type="text"
          placeholder="focus popover"
          class="
            p-1
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            shadow-sm
            border-gray-300
            rounded
          "
        />
      </template>
      <template #header>Popover</template>
      item item 2
      <input type="text" />
      <input type="text" />
    </v-popover>

    <br>

        <v-button @click="dropdownplacement = 'bottom'">placement bottom</v-button>
    <v-button id="button">popover button id</v-button>
    <v-popover
      trigger="click"
      :delay="50"
      click-outside-close
      target-id="button"
      :placement="dropdownplacement"
    >
      <!-- <template #activator><v-button>popover click</v-button></template> -->
      <template #header>Popover</template>
      item item 2
      <input type="" />
    </v-popover>

    <br>

    <v-popover title="popover" trigger="hover" :delay="500" transition="fade">
      <template #activator>
        <!-- <v&#45;button>popover</v&#45;button> -->
        <v-button>popover hover</v-button>
      </template>
      <template #header>Popover</template>
      item item 2
      <input type="" />
    </v-popover>

    <v-popover trigger="focus">
      <template #activator>
        <input ref="activator" type="text" placeholder="focus popover" />
      </template>
      <template #header>Popover</template>
      item item 2
      <input type="" />
    </v-popover>

  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import dataJSON from "./../data.json";
import vTabs from "./vTabs.vue";
import vTab from "./vTab.vue";
import vTable from './vTable.vue'
// import {vTable} from "./index.js"
import vDatePicker from "./vDatePicker.vue";
import vCard from "./vCard.vue";
import vSidepanel from "./vSidepanel.vue";
import vButton from "./vButton.vue";
// import {vButton, vTable} from "../vue-component-tailwind.es.js"
import vPagination from "./vPagination.vue";
import vDropdown from "./vDropdown.vue";
import vDropdownMenuItem from "./vDropdownMenuItem.vue";
import vDropdownHeader from "./vDropdownHeader.vue";
import vDivider from "./vDivider.vue";
import vList from "./vList.vue";
import vListItem from "./vListItem.vue";
import vCollapse from "./vCollapse.vue";
import vModal from "./vModal.vue";
import vBadge from "./vBadge.vue";
import vPopover from "./vPopover.vue";
import tooltip from "../directives/tooltip.js";
import vSpinner from "./vSpinner.vue";
import vAlert from "./vAlert.vue";
import vInputDate from "./vInputDate.vue";
import vInput from "./vInput.vue";
import vSelect from "./vSelect.vue";
import vProgress from "./vProgress.vue";
import vRange from "./vRange.vue";
import vTextarea from "./vTextarea.vue";
import vCheckbox from "./vCheckbox.vue";
import vNavbar from "./vNavbar.vue";
import vRadio from "./vRadio.vue";
import vChevron from "./vChevron.vue"
import vBreadcrumb from "./vBreadcrumb.vue";
// import {vTable} from "../dist/vuecomponent2.es"

export default {
  name: "HelloWorld",
  components: {
    vTabs,
    vTab,
    vTable,
    vDatePicker,
    vCard,
    vButton,
    vSidepanel,
    vPagination,
    vDropdown,
    vDropdownMenuItem,
    vDropdownHeader,
    vDivider,
    vList,
    vListItem,
    vCollapse,
    vModal,
    vBadge,
    vPopover,
    vSpinner,
    vInputDate,
    vProgress,
    vAlert,
    vInput,
    vSelect,
    vRange,
    vNavbar,
    vCheckbox,
    vTextarea,
    vRadio,
    vChevron,
    vBreadcrumb,
  },
  props: {
    msg: String,
  },
  directives: {
    tooltip,
  },
  setup(props) {
    // let data = ref(dataJSON.slice(0, 140));
    let data = ref(dataJSON);
    data.value.map((i) => (i.date = new Date(2021, 2, 2)));
    data.value[1].date = new Date(2021, 4, 2);
    data.value[2].date = new Date(2021, 7, 2);
    let dataTest = [2, 3, 5, 12, 20, 21, 22, 30, 31, 40, 41, 42, 43, 45, 60];
    let dataTest2 = [7, 30, 40, 70];
    dataTest.forEach((i) => (data.value[i].first_name = null));
    dataTest.forEach((i) => (data.value[i].country = undefined));
    dataTest.forEach((i) => (data.value[i].city = undefined));
    // dataTest2.forEach(i => data.value[i].id = NaN)
    let dropdownplacement = ref("bottom-start");
    let alertShow = ref(false)
    let dataEmpty = ref([]);
    let busy = ref(false);
    let tableCommand = null;
    let tableSelection = ref([]);
    let sidepanelHeader = ref(true)
    let stateFormGroup = ref("")
    let controlModel = ref("")
    let header = ref([
      [
        "id", ["first_name", "last_name", {as: "name"}], "date", ["email", {as: "em"}], "city", "country", "item_city"
      ]
    ])
    // [
    //     "id", "first_name", "last_name", "email", "city"
    //   ]
    //   [
    //     "id", "name" col = 2, "em", "city"
    //   ]
    
    let progress = ref(10);
    let textModel = ref("text")
    let linkItems = ref([
      {
        label: "home",
        // href: "http://google.com",
        to: "/",
      },
      {
        label: "documentations",
        to: "documentation",
      },
      {
        label: "component",
      },
    ])
    let selectModel = ref("option")
    let selectOptions = ref([
    {
      value: "option",
      label: "option",
    },
    {
      value: "option2",
      label: "option2",
      disabled: true,
    },
    {
      value: "option3",
      label: "option4",
      disabled: null,
    },
    ])
    // data.value = dataEmpty.value;
    let definition = ref([
      {
        key: "id",
        sortable: true,
        filterable: false,
        class: () => "w-1/12",
      },
      {
        key: "first_name",
        sortable: true,
        class: () => "w-2/12",
      },
      {
        key: "last_name",
        sortable: true,
        class: () => "w-2/12",
      },
      {
        key: "date",
        filterable: false,
        sortable: true,
        f: (k, v) => v.toLocaleDateString(),
        class: () => "bg-gray-100 w-2/12",
      },
      // {
      //   key: "last_name",
      // },
      {
        key: "email",
        sortable: true,
        class: () => "w-3/12",
      },
      {
        key: "city",
        // visible: false,
        sortable: true,
        f: (k, v, i) => i.id + " " + k + " " + v,
        // sortByFunction: true,
        // filterByFunction: true,
        class: () => "w-2/12",
      },
      {
        key: "country",
        class: () => "w-1/12",
      },
      {
        key: "item_city",
      },
    ]);
    let i = ref([]);
    let filter = ref("");
    let sidepanel = ref(false);
    let tableItemsCount = ref(0);
    let itemsPerPage = ref(10);
    let page = ref(1);
    let i2 = ref(false);
    let modal = ref(false);
    let tooltipTest = ref(false);
    let activator = ref(null);
    let popoverText = ref("");
    let popoverShow = ref(false);
    let classadd = ref("");
    let tabname = ref("item 2");
    let formattedDate = "";
    let log = (m) => console.log(m);


    let buttonPrimary = "bg-indigo-500 hover:bg-indigo-600";
    let buttonSmall = "py-1";

    onMounted(async () => {
      setTimeout(() => {
        tooltipTest.value = true;
      }, 4000);
    controlModel.value = "small"
      await nextTick()
    controlModel.value = "tiny"
      await nextTick()
    controlModel.value = "control model"
    });

    return {
      data,
      dataJSON,
      definition,
      i,
      sidepanel,
      filter,
      tableItemsCount,
      itemsPerPage,
      page,
      i2,
      tableSelection,
      busy,
      modal,
      progress,
      tooltipTest,
      activator,
      popoverText,
      popoverShow,
      classadd,
      tabname,
      textModel,
      selectModel,
      selectOptions,
      dropdownplacement,
      buttonPrimary,
      buttonSmall,
      formattedDate,
      sidepanelHeader,
      alertShow,
      linkItems,
      stateFormGroup,
      controlModel,
      header,
      log,
    };
  },
};
</script>

<style>
a {
  @apply text-blue-500 underline;
}
</style>
