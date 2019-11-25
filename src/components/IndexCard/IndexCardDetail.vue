<template>
  <div class="indexCardDetail">
    <b-modal :id="indexCardData.id" :title="indexCardData.company">
      <p>
        <br />
        {{ indexCardData.adress.street }} {{ indexCardData.adress.houseNumber }}
        <br />
        {{ indexCardData.adress.postCode }} {{ indexCardData.adress.city }}
      </p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "IndexCardDetail",
  props: {
    indexCardData: Object
  }
};
</script>

<style scoped lang="scss"></style>
