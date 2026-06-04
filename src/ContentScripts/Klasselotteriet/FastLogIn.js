import { getCurrentTab } from '../../ChromeTools';

const handleEnableCta = async (cta) => {
  const tab = await getCurrentTab();

  if ((tab?.url?.includes('klasselotteriet.local') || tab?.url?.includes('.klasselotteriet.dk')) && !tab?.url?.includes('/sitecore/')) {
    cta.removeAttribute('disabled');
  }
};

const toggleLabel = (cta, showFastLogin) => {
  const span = cta.querySelector('span');
  span.innerText = showFastLogin ? 'til' : 'fra';
};

export const toggleKlFastLogin = () => {
  const fastLoginButton = document.querySelector('#fastLogin');
  void handleEnableCta(fastLoginButton);

  chrome.storage.sync.get('fastLogin', ({ fastLogin }) => {
    toggleLabel(fastLoginButton, fastLogin);

    fastLoginButton.addEventListener('click', async () => {
      if (fastLoginButton.hasAttribute('disabled')) return;

      fastLogin = !fastLogin;
      chrome.storage.sync.set({ fastLogin });
      toggleLabel(fastLoginButton, fastLogin);
    });
  });
};
