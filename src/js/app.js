import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    const form = formUI.form;

    //Events
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();

    })

    //Handlers
    async function initApp() {
        const res = await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }

    async function onFormSubmit() {
        const origin =locations.getCityByCode(formUI.originValue);
        const destination = locations.getCityByCode(formUI.destinationValue);
        const depart_date =  formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;
 
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });

    }
});
