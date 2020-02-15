
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myEvents: []
        };

        mobiscroll.util.getJson('https://trial.mobiscroll.com/events/', (events) => {
            this.setState({ myEvents: events });
        }, 'jsonp');
    }
    render() {
        return (
            <div className="mbsc-grid-fixed mbsc-grid-md md-event-list-agenda">
                <mobiscroll.Eventcalendar
                    lang="es"
                    theme="ios"
                    themeVariant="light"
                    display="inline"
                    data={this.state.myEvents}
                    view={{
                        calendar: { type: 'month' },
                        eventList: { type: 'month', scrollable: true }
                    }}
                />
            </div>
        );
    }    

export default Calendar;
