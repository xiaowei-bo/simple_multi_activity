<template>
    <div>home vue updat</div>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
    methods: {
        async getDemo() {
            const res = await this.$http({
                url: "/api/demo/info.paper",
                isMock: true,
                method: "GET"
            });
            console.log(res);
        }
    },
    created() {
        this.getDemo();
    }
};
</script>

<style lang='scss' scoped>
</style>