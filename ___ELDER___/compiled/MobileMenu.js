'use strict';

function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}

/* src/components/Home/MobileMenu.svelte generated by Svelte v3.25.1 */

const MobileMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	return `<nav class="${"relative max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 pt-6 pb-6 sm:pb-12"}"><div class="${"flex items-center flex-1"}"><div class="${"flex items-center justify-between w-full md:w-auto"}"><a href="${"/"}" aria-label="${"Home"}" class="${"text-white"}">swyx.io </a>
      <div class="${"-mr-2 flex items-center md:hidden"}"><button type="${"button"}" class="${"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700\n            focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out"}" id="${"main-menu"}" aria-label="${"Main menu"}" aria-haspopup="${"true"}"><svg class="${"h-6 w-6"}" stroke="${"currentColor"}" fill="${"none"}" viewBox="${"0 0 24 24"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M4 6h16M4 12h16M4 18h16"}"></path></svg></button></div></div>
    <div class="${"hidden space-x-10 md:flex md:ml-10"}"><a href="${"/ideas"}" class="${"font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out"}">Ideas</a>
      <a href="${"#d"}" class="${"font-medium text-white hover:text-gray-300 transition duration-150 ease-in-out"}">Features</a></div></div>
  </nav>

${ ``}`;
});

module.exports = MobileMenu;
