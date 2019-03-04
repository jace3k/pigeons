import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
  container: {
    width: '100%',
    margin: '2em',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0.3em',
    }
  },
  card: {
    padding: '2em',
    margin: '2em auto',
    maxWidth: '80%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      margin: 0,
      padding: '1em',
    }
  },
  content: {
    textAlign: 'justify',
  }
});

class Rules extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Card className={classes.card}>
        <Typography variant={"h3"}>
          REGULAMIN
        </Typography>

        {/*<ol className={classes.content}>*/}
          {/*<li>Na aukcjie  są wystawiane gołębie pocztowe zgłaszane przez ich właścicieli.</li>*/}
          {/*<li>Wystawiane gołębie muszą posiadać kartę własności oraz rodowód.</li>*/}
          {/*<li>Żeby kupić gołębia pocztowego z dobrym pochodzeniem i nie tylko czeba się zajerestrować na stronie.</li>*/}
          {/*<li>Podczas licytacji widoczny jest tylko nick osoby zarejestrowanej w serwisie. Wszelkie inne dane są zastrzeżone.</li>*/}
          {/*<li>Osoba licytująca zobowiązuje się kupić gołębia, a wystawca sprzedać za wylicytowaną kwotę. W przypadku gdyby kupujący lub sprzedawca odstąpili od sfinalizowania transakcji osoby te zostaną usunięte z grona użytkowników i i nie będą mogli uczestniczyć w innych aukcjach organizowanych przez ten serwis.</li>*/}
          {/*<li>Koszty dostarczenia gołębia pokrywa kupujący po ustaleniu zasad ze sprzedającym (dostawa przez Pocztę Polską, kuriera lub odbiór osobisty). Osoby licytujące z zagranicy zobowiązane są podać odbiorcę na terenie Polski do dostarczenia gołębia. Istnieje możliwość przechowania gołębia przez nasz serwis po uprzednim uzgodnieniu zasad i terminu odbioru.</li>*/}
          {/*<li>W przypadku jeżeli transakcja nie zostanie sfinalizowana, sprzedający odmówi sprzedaży gołębia lub kupujący nie zakupi gołębia za wylicytowaną sumę, osoby te zostaną usunięte z listy użytkowników giełdy i ich dane zostaną opublikowane celem ostrzeżenia potencjalnych innych klientów.</li>*/}
          {/*<li>Jeden użytkownik może dać na aukcjie max 2 szt gołębia.</li>*/}
          {/*<li>Gdy użytkownik chce mieć na Aukcji więcej gołębi niż dwie sztuki musi zakupić konto premium.</li>*/}
          {/*<li>Gdy zakupimy konto premium możemy dawać nie ograniczoną ilość gołębi na aukcji.</li>*/}
          {/*<li>*/}
            {/*Stawka Premium:*/}
            {/*<ul>*/}
              {/*<li>15 zł / 7 dni Premium</li>*/}
              {/*<li>25 zł / 14 dni premium</li>*/}
              {/*<li>40 zł / 30 dni premium</li>*/}
              {/*<li>50 zł / 45 dni premium</li>*/}
              {/*<li>80 zł / 80 dni premium</li>*/}
              {/*<li>150 zł / 160 dni premium</li>*/}
              {/*<li>Gdy użytkownik chce zakupić na cały rok 12 miesięcy Premium cena wynosi 500 zł</li>*/}
            {/*</ul>*/}
          {/*</li>*/}
          {/*<li>Raz na 40 dni jest podwojenie dni premium np.15 zł / zamiast 7 dni x2 = 14 dni premium przy każdej kwocie jest taka możliwość wszytsko będzie na bierząco.</li>*/}
          {/*<li>Zapłata na premium jest możliwa tylko przelewem bankowym.Wtedy gdy wysłał przelew kupujący premium musi napisać sms na tel.518910648 z jego nikiem i na jaki nr banku przelał pięniądze.</li>*/}
          {/*<li>Dane .....................................</li>*/}
          {/*<li>Kup teraz oznacza jak olx można dawać różne gołębie bez karty bez rodowodu i nie ma z tego prowizji.Osoba sprzedająca może wysatwić dowolną liczbe gołębi.</li>*/}
        {/*</ol>*/}
        <ol>
          <li>Zakładając konto w portalu, użytkownik wyraża zgodę na przetwarzanie danych osobowych zgodnie z zasadami wyznaczonymi przez Rozporządzenie RODO. </li>
          <li>
            W celu realizacji usług dostępnych na portalu gołębi, wykorzystywane są pliki cookies. Pliki cookies można kontrolować za pomocą ustawień swojej przeglądarki.
            Dalsze korzystanie z naszego serwisu internetowego, bez zmiany ustawień przeglądarki internetowej oznacza, iż użytkownik akceptuje stosowanie plików cookies.
          </li>
          <li>Zwyciężca aukcji (kupujący) zobowiązany jest do kontaktu ze sprzedającym i dokonania opłaty za wygranego gołębia.</li>
          <li>Sprzedający zobowiązany jest za dostarczenie gołębia kupującemu po uiszczeniu opłaty.</li>
          <li>Forma dostawy jak i płatności uzgadniana jest między sprzedawcą a kupującym.</li>
          <li>W celu dokonania zakupu, bądź wzięcia udziału w licytacji wymagane jest założenie konta.</li>
          <li>Zrezygnowanie z zakupu jest możliwe jedynie po uzgodnienu obu stron (kupującego i sprzedającego).</li>
        </ol>
        <Typography variant={"h6"}>
          Dziękujemy za zapoznanie się z regulaminem.
        </Typography>
      </Card>
    );
  }
}

export default withStyles(styles)(Rules);