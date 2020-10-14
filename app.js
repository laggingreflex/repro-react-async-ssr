const {
  createElement: h,
  useState,
  unstable_useTransition: useTransition,
} = require('react')
const { createResourceFactory } = require('react-lazy-data')
const { Suspense } = require('react')

const delay = () => new Promise(r => setTimeout(r, 1000));
const api = async props => {
  // console.log('api');
  await delay();
  return { text: `id: ${props.id}` };
};

const Resource = createResourceFactory(api, {
  id: 'app',
  // id: `${Math.random()}`,
  serialize: props => `${props.id}`,
  // serialize: () => `${Math.random()}`,
})

function Suspended(props) {
  const [resource, update_] = useState(createResource());
  const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });

  const update = () => {
    startTransition(() => {
      resource.dispose();
      update_(createResource(resource.id + 1))
    })
  }

  return h(Suspense, { fallback: 'Loading' }, h(App, { resource, update, isPending, ...props }));
  // return h(App, { resource, update, ...props });
  // return h(AppWrapper, { resource, update, ...props });
}

function createResource(id = 0) {
  // console.log('Creating resource', id);
  const resource = Resource.create({ id });
  resource.id = id
  return resource;
}

function App({ resource, update, isPending }) {
  const data = resource.read();
  return h('button', {
    disabled: isPending,
    onClick: update
  }, isPending ? 'Loading...' : data.text)
}

module.exports = Suspended
