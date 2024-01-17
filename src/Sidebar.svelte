<script>
	import { Flex } from '@svelteuidev/core';
    import { Container } from '@svelteuidev/core';

	import AsyncWrapper from './AsyncWrapper.svelte';
	import TreeNav from './TreeNav.svelte';
    import { NavHelperInstance } from './modules/navhelper'

	import { parse } from 'yaml'    


	const loadIndex = async () => {
		let response = await fetch('/md/index.yaml');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let yamlContent = await response.text();
        const jsObject = parse(yamlContent);
        let nh = NavHelperInstance();
        nh.InitialiseFrom(jsObject);
        return jsObject
    }
</script>

 
 <style>
    .topspace {
        margin-top: 1em;
    }
 </style>

<Container>
	<AsyncWrapper awaitable={() => loadIndex()} let:dataFromAwaitable>
        <Flex direction="column" gap="xs" >
            <div class="topspace"/>
            <TreeNav indent={0} items={dataFromAwaitable}/>
        </Flex>
	</AsyncWrapper>
</Container>

