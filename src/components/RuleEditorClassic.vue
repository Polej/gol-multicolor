<template>
    <div>
        <table cellspacing="1" cellpadding="0">
            <tr>
                B
                <td v-for="number in arr" :key="number">
                    <label>{{ number }}
                        <input type="checkbox" v-model="b[number]"/>
                    </label>
                </td>
            </tr>
            <tr>
                S
                <td v-for="number in arr" :key="number">
                    <label>{{ number }}
                        <input type="checkbox" v-model="s[number]"/>
                    </label>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

export default {
    data() {
        return {
            arr: Array.from(Array(9).keys()),
            b: Array(9),
            s: Array(9),
        };
    },
};

</script>
