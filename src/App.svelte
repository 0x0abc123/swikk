<script>
	import { onMount } from 'svelte';
	import { cssvariable } from '@svelteuidev/composables';
	import { colorScheme, SvelteUIProvider } from '@svelteuidev/core';

	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';

    import { NavHelperInstance } from './modules/navhelper'

	import MarkdownView from './MarkdownView.svelte';

	let bgcolour = "#131f5e";
	$: styleVars = {
		headerColour: bgcolour
	};

	let prevPage;
	let nextPage;

	function toggleTheme() {
		colorScheme.update((v) => (v === 'light' ? 'dark' : 'light'));
	}

	const HOME_PAGE = "_home.md";
	let pageViewed = "";


	let nh = NavHelperInstance();
    nh.Initialised.subscribe((value) => {
        CalculatePrevNext(pageViewed);
    });

	function CalculatePrevNext(path) {
		prevPage = nh.GetPageBefore(path);
		nextPage = nh.GetPageAfter(path);
	}


	function getHash() {
		let wHash = window.location.hash || "#";
		return wHash.substring(1);
	}


	function handleHashChange(event) {
		let hash = getHash();
		pageViewed = hash || HOME_PAGE;
		CalculatePrevNext(pageViewed);
	}


	function loadPage() {
		handleHashChange(null);
	}


	function loadStyleConfig() {
		fetch(`/style.json`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(jsonStr => {
			let styleConf = JSON.parse(jsonStr);
			bgcolour = styleConf.bgcolour;
        })
        .catch(error => {
          console.error('Error during fetch operation:', error);
        });

	}


	onMount(() => {
		loadStyleConfig();
		loadPage();
		window.addEventListener("hashchange", handleHashChange);	

		const targetNode = document.getElementById("themainview");
		const config = { attributes: false, childList: true, subtree: false };

		const callback = (mutationList, observer) => {
			for (const mutation of mutationList) {
				for (const child of mutation.addedNodes) {
					if(child.id)
						console.log("added",child);
				}
				for (const child of mutation.removedNodes) {
					if(child.id)
						console.log("removed",child);
				}
			}
		};

		const observer = new MutationObserver(callback);
		observer.observe(targetNode, config);

	});

</script>



<style>

    .svlt0-outercontainer {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
    }

    .svlt0-header {
        width: 100%;
        background-color:  var(--headerColour);
    }

    .svlt0-middle {
        flex: 1 1 0%;
        width: 100%;
        overflow: auto;
        display: flex;
        flex-direction: row;
    }

    .svlt0-sidebar {
        min-width:  min-content;
        /*max-width:  20%;*/
        width:  20%;
        height: 100%;
        overflow: auto;
    }

    .svlt0-main {
		width: 100%;
        overflow: auto;
    }

</style>

<SvelteUIProvider withGlobalStyles themeObserver={$colorScheme}>


<div class="svlt0-outercontainer">
	<div use:cssvariable={styleVars} class="svlt0-header"><Header darkModeToggle={toggleTheme}/></div>
	<div class="svlt0-middle">
		<div class="svlt0-sidebar"><Sidebar/></div>
		<div class="svlt0-main" id="themainview">
			{#key pageViewed}
			<MarkdownView {pageViewed} {prevPage} {nextPage}/>
			{/key}
		</div>
	</div>
</div>

</SvelteUIProvider>