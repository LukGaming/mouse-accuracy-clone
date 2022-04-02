<template >
    <div>
        <v-btn color="primary" class="ma-2" dark @click="dialog2 = true">Open Dialog 2</v-btn>
        <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
                <v-card-title>Dialog 2</v-card-title>
                <v-card-actions>
                     <v-btn color="primary" class="ma-2" dark @click="dialog2 = false">Fechar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialog2: true
        }
    }
}
</script>
<style >
</style>