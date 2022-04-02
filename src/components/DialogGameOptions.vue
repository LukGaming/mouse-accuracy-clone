<template >
    <div>
        <v-btn color="primary" class="ma-2 btnConfig" dark @click="dialog2 = true">
            <v-icon dark>mdi-wrench</v-icon>
        </v-btn>
        <v-dialog v-model="dialog2" max-width="500px">
            <v-card dark>
                <v-card-title>Opções de jogabilidade</v-card-title>
                <v-card-actions class="flex-row">
                    <v-card-title>Cor do alvo:</v-card-title>
                    <v-text-field v-model="color" v-mask="mask" hide-details class="ma-0 pa-0" solo>
                        <template v-slot:append>
                            <v-menu
                                v-model="menu"
                                top
                                nudge-bottom="105"
                                nudge-left="16"
                                :close-on-content-click="false"
                            >
                                <template v-slot:activator="{ on }">
                                    <div :style="swatchStyle" v-on="on" />
                                </template>
                                <v-card>
                                    <v-card-text class="pa-0">
                                        <v-color-picker v-model="color" flat />
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </template>
                    </v-text-field>
                </v-card-actions>

                <v-card-actions class="flex-row justify-space-around">
                    <v-btn color="primary" class="ma-2" dark @click="save">Salvar</v-btn>
                    <v-btn color="secondary" class="ma-2" dark @click="redefine">Redefinir</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialog2: true,
            color: '#1976D2FF',
            mask: '!#XXXXXXXX',
            menu: false
        }
    },
    methods: {
        redefine() {

        },
        save() {

        }

    },
    computed: {
        swatchStyle() {
            const { color, menu } = this
            return {
                backgroundColor: color,
                cursor: 'pointer',
                height: '30px',
                width: '30px',
                borderRadius: menu ? '50%' : '4px',
                transition: 'border-radius 200ms ease-in-out'
            }
        }
    }
}
</script>
<style scoped>
.btnConfig {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;
}
</style>