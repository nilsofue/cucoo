<template>
  <div class="indexCard">
    <b-card
      :title="indexCardData.company"
      :sub-title="'Tel: ' + indexCardData.phone"
    >
      <b-card-text>
        <br />
        {{ indexCardData.adress.street }} {{ indexCardData.adress.houseNumber }}
        <br />
        {{ indexCardData.adress.postCode }} {{ indexCardData.adress.city }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "IndexCard",
  props: {
    indexCardData: Object
  }
};
</script>

<style scoped lang="scss"></style>
