<template>
<div v-if="Object.keys(paramInfo).length !== 0" class="params-info">
		
			<table v-for="(table, index) in paramInfo.rule.tables" class="info-size" :key="index">
				<tr 
                v-for="(tr, indey) in table" 
                :key="indey"
                >
					<td v-for="(td,indez) in tr" :key="indez">
                        {{td}}
                    </td>
				</tr>
			</table>
		
		<table class="info-param">
            <tr v-for="(info, index) in paramInfo.info.set" :key="index">
                <td class="info-param-key">{{info.key}}</td>
                <td class="param-value">{{info.value}}</td>
            </tr>
        </table>
        <div class="info-img" v-if="paramInfo.info.images">
            <img :src="paramInfo.info.images[0]" alt="">
        </div>
  </div>
</template>

<script>
export default {
    props: {
        paramInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    }

}
</script>

<style lang="less" scoped>
	.params-info {
		padding: 20px 15px;
        font-size: 14px;
        border-bottom: 5px solid #f3f5f8;
	}
	.params-info table {
		width: 100%;
        border-collapse: collapse;
	}
	.params-info table tr {
		height: 42px;
	}
    .params-info table tr td {
        border-bottom: 1px solid rgba(0,0,0,.1);
    }
    .param-value {
        color: #eb4868;
    }
    .info-img img {
        width: 100%;
    }
</style>
