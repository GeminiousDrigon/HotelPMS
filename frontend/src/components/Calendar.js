import React, { Component } from "react";
//import moment from 'moment'
//import 'moment/locale/zh-cn';
// import 'antd/lib/style/index.less';     //Add this code for locally example
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT } from "react-big-scheduler";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "react-big-scheduler/lib/css/style.css";
import Button from "@material-ui/core/Button";
import { Popover } from "@material-ui/core";
import axios from "axios";
import moment from "moment";

class TestCalendar extends Component {
    constructor(props) {
        super(props);

        //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
        this.schedulerData = new SchedulerData(new moment(), ViewTypes.Month, false, false, {
            schedulerMaxHeight: 500,
            schedulerWidth: "92%",
            eventItemPopoverEnabled: false,
            weekResourceTableWidth: 300,
            monthResourceTableWidth: 300,
            quarterResourceTableWidth: 300,
            yearResourceTableWidth: 300,
            resourceName: "Room number",
            movable: false,
            views: [
                {
                    viewName: "Week",
                    viewType: ViewTypes.Week,
                    showAgenda: false,
                    isEventPerspective: false
                },
                {
                    viewName: "Month",
                    viewType: ViewTypes.Month,
                    showAgenda: false,
                    isEventPerspective: false
                },
                {
                    viewName: "Quarter",
                    viewType: ViewTypes.Quarter,
                    showAgenda: false,
                    isEventPerspective: false
                },
                {
                    viewName: "Year",
                    viewType: ViewTypes.Year,
                    showAgenda: false,
                    isEventPerspective: false
                }
            ]
        });
        this.schedulerData.localeMoment.locale("en");
        // this.schedulerData.setResources([
        //     {
        //         id: "r0",
        //         name: "Resource0",
        //     },
        //     {
        //         id: "r1",
        //         name: "Resource1",
        //     },
        //     {
        //         id: "r2",
        //         name: "Resource2",
        //     }
        // ]);
        // this.schedulerData.setEvents(this.DemoData.events);
        this.state = {
            viewModel: this.schedulerData,
            resources: [],
            bookings: [],
            fetching: true
        };
    }
    DemoData = {
        events: [
            {
                id: 1,
                start: "2019-09-18 09:30:00",
                end: "2019-09-19 23:30:00",
                resourceId: "b870e4b4-4c70-4b05-8d56-5dd82395b064",
                title: "I am finished",
                bgColor: "#D9D9D9",
                resizable: false
            }
        ]
    };

    async componentDidMount() {
        let [rooms, bookings] = await Promise.all([axios.get("/api/room"), axios.get("/api/booking")]);
        rooms = rooms.data.map((el, i) => {
            el.resourceId = el.id;
            el.name = el.room_number + " " + `(${el.room_type.name})`;
            return el;
        });
        bookings = bookings.data.map((el, i) => {
            el.start = new Date(el.booking.from_date);
            el.end = new Date(el.booking.to_date);
            el.title = `#${el.room.room_number} ${el.booking.user.firstname} ${el.booking.user.lastname}`;
            el.bgColor = el.color;
            el.resizable = false;
            el.resourceId = el.room_id;
            return el;
        });
        console.log(bookings)
        this.setState({ rooms: rooms, bookings: bookings });
        console.log(bookings);
        this.state.viewModel.setResources(rooms);
        this.state.viewModel.setEvents(bookings);
        this.forceUpdate();
    }
    componentDidUpdate() {
        document.getElementsByClassName("scheduler-view")[0].children[1].style.maxHeight = window.innerHeight - (106 + 40 + 56 + 45 + 20) + "px";
        document.getElementsByClassName("resource-view")[0].children[1].style.maxHeight = window.innerHeight - (106 + 40 + 56 + 45 + 20) + "px";
    }

    render() {
        const { viewModel } = this.state;
        return (
            <Scheduler
                schedulerData={viewModel}
                prevClick={this.prevClick}
                nextClick={this.nextClick}
                onSelectDate={this.onSelectDate}
                onViewChange={this.onViewChange}
                eventItemClick={this.eventClicked}
                viewEventClick={this.ops1}
                viewEventText="Ops 1"
                viewEvent2Text="Ops 2"
                viewEvent2Click={this.ops2}
                updateEventStart={this.updateEventStart}
                updateEventEnd={this.updateEventEnd}
                moveEvent={this.moveEvent}
                // newEvent={this.newEvent}
                onScrollLeft={this.onScrollLeft}
                onScrollRight={this.onScrollRight}
                onScrollTop={this.onScrollTop}
                onScrollBottom={this.onScrollBottom}
                toggleExpandFunc={this.toggleExpandFunc}
                eventItemPopoverTemplateResolver={this.eventItemPopoverTemplateResolver}
            />
        );
    }

    prevClick = schedulerData => {
        schedulerData.prev();
        schedulerData.setEvents(this.state.bookings);
        this.setState({
            viewModel: schedulerData
        });
    };

    nextClick = schedulerData => {
        schedulerData.next();
        schedulerData.setEvents(this.state.bookings);
        this.setState({
            viewModel: schedulerData
        });
    };

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(this.state.bookings);
        this.setState({
            viewModel: schedulerData
        });
    };

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(this.state.bookings);
        this.setState({
            viewModel: schedulerData
        });
    };

    eventClicked = (schedulerData, event) => {
        console.log(schedulerData);
        console.log(event);
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        let newFreshId = 0;
        schedulerData.events.forEach(item => {
            if (item.id >= newFreshId) newFreshId = item.id + 1;
        });

        let newEvent = {
            id: newFreshId,
            title: "New event you just created",
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: "purple"
        };
        schedulerData.addEvent(newEvent);
        this.setState({
            viewModel: schedulerData
        });
    };

    updateEventStart = (schedulerData, event, newStart) => {
        schedulerData.updateEventStart(event, newStart);
        this.setState({
            viewModel: schedulerData
        });
    };

    updateEventEnd = (schedulerData, event, newEnd) => {
        schedulerData.updateEventEnd(event, newEnd);
        this.setState({
            viewModel: schedulerData
        });
    };

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        this.setState({
            viewModel: schedulerData
        });
    };

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => null;

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => null;

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => null;

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => null;

    toggleExpandFunc = (schedulerData, slotId) => {
        console.log(schedulerData, slotId);
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    };

    eventItemPopoverTemplateResolver = (
        schedulerData,
        eventItem,
        title,
        start,
        end,
        statusColor
    ) => {
        console.log(schedulerData, eventItem, title, start, end, statusColor);
        return null;
    };
}

const withDragDropContext = DragDropContext(HTML5Backend);
export default withDragDropContext(TestCalendar);
