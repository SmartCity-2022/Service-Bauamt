import * as React from 'react';
import Container from '@mui/material/Container';

const Infos = () => {

  const divStyle = {
    color: "white",
    background: '#dfc217',
    heigh: "100%",
    padding: "1rem",
  }

  const allStyle = {
    margin: "0",
    padding: "0"
  }

  return (
    <Container maxWidth="" style={allStyle}>

      <div class="row m-2" style={divStyle}>
        <div class="container">
          <div class="row header_text_wrapper v-align">
            <div class="col-xs-12 col-sm-12 col-md-12">
              <div className='col-md-8 offset-md-2'>
                <h1 className=''>Vom Bauantrag zur Baugenehmigung</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className='row my-4'>
      <div className='col-md-8 offset-md-2'>

          <div class="text">
            <h3 class="ttbase-heading ttbase-heading-none text-align-left">Wann benötige ich eine Baugenehmigung?</h3>
              <p>Für jedes Bauvorhaben (Errichtung, Änderung oder Nutzungsänderung einer Anlage) ist grundsätzlich eine Genehmigung notwendig. Sollte Ihr Projekt nach der jeweils geltenden Landesbauordnung als verfahrensfrei eingestuft sein, ist keine Baugenehmigung notwendig.</p>
              <p>Die Anforderungen und Bearbeitungszeiten im Genehmigungsverfahren unterscheiden sich zum Teil erheblich, da jedes Bundesland über eine eigene Landesbauordnung verfügt. In diesen werden die Anforderungen an Grundstück und Bebauung sowie Formalien wie der Ablauf des Baugenehmigungsverfahrens, die Organisation der Bauaufsichtsbehörden sowie die Voraussetzungen für die Bauvorlageberechtigung geregelt. Die <a href="https://www.dibt.de/fileadmin/dibt-website/Dokumente/Rechtsgrundlagen/MBO_2016_Gesamt.pdf">Musterbauordnung (MBO)</a> dient als Grundlage für die Landesbauordnungen.</p>
            <p>&nbsp;</p>
          </div>
          <h3 class="ttbase-heading ttbase-heading-none text-align-left ">Welche Unterlagen muss ich einreichen?</h3>
          <p>Die Baugenehmigung ist die Erlaubnis der Bauaufsichtshörde eine bauliche Anlage zu errichten, zu ändern oder zu beseitigen. Diese wird nur auf schriftlichen Antrag erteilt. In der Regel ist der Bauantrag, zusammen mit den erforderlichen Unterlagen, bei der Gemeinde oder bei der Bauaufsichtsbehörde einzureichen. Welche Bauvorlagen in Ihrem Fall erforderlich sind, regelt die Bauvorlagenverordnung des jeweiligen Bundeslandes. Neben dem eigentlichen Antragsformular werden üblicherweise</p>
          <ul>
            <li>Lageplan</li>
            <li>Bauzeichnungen</li>
            <li>Baubeschreibung und</li>
            <li>Angaben über Grundstücksentwässerung, Wasserversorgung und straßenmäßige Erschließung</li>
          </ul>
          <p>verlangt.</p>
            <p>Je nach Bauvorhaben können jedoch noch weitere Unterlagen wie Abstandsflächenübernahmeerklärung, Abweichungsantrag, Freiflächengestaltungsplan, Baumbestandserklärung etc. erforderlich sein. Die für Sie zuständige Bauaufsichtsbehörde erteilt dazu Auskunft.</p>
            <p>Die Bauvorlagen müssen von einem bauvorlageberechtigten Entwurfsverfasser, beispielsweise einem Architekten, unterzeichnet sein.</p>
              <p>&nbsp;</p>
          <h3 class="ttbase-heading ttbase-heading-none text-align-left ">Muss ich die Nachbarn informieren?</h3>
            <p>Handelt es sich bei Ihrem Projekt um ein genehmigungspflichtiges Vorhaben, müssen Sie den Eigentümern der benachbarten Grundstücke den Lageplan und die Bauzeichnungen zur Unterschrift vorlegen. Unterschreiben diese nicht, hat dies keine Auswirkung auf die Erteilung der Baugenehmigung.</p>
            <p>Ist Ihr Vorhaben genehmigungsfreigestellt, müssen Sie Ihre Nachbarn lediglich von dem Bauvorhaben benachrichtigen.</p>
              <p>&nbsp;</p>
          <h3 class="ttbase-heading ttbase-heading-none text-align-left ">Wie wird mein Bauantrag geprüft?</h3>
            <div class="wpb_text_column wpb_content_element ">
              <div class="wpb_wrapper">
                <p>Haben Sie den Bauantrag bei der Gemeinde eingereicht, leitet diese Ihre Unterlagen an die zuständige Bauaufsichtsbehörde&nbsp;weiter. Wo erforderlich, erteilt sie ihr Einverständnis zu dem Vorhaben. Dies bedeutet jedoch nicht, dass Ihr Vorhaben genehmigt wurde oder genehmigungsfähig ist. Dies ist allein Aufgabe der Bauaufsichtsbehörde. Der Prüfungsumfang im Baugenehmigungsverfahren ist abhängig von der Art des Vorhabens. So wird im vereinfachten Baugenehmigungsverfahren nur ein Teil besonders wichtiger Anforderungen geprüft.</p>
                <p><strong>Grundsätzlich sind Sie als Bauherr gemeinsam mit Ihrem Entwurfsverfasser für die Einhaltung der öffentlich-rechtlichen Anforderungen verantwortlich.</strong></p>
            <p>&nbsp;</p>
          <h3 class="ttbase-heading ttbase-heading-none text-align-left ">Benötige ich einen Vorbescheid?</h3>
            <p>Mit einem Vorbescheid können Sie vorab wichtige Fragen Ihres Bauvorhabens verbindlich klären lassen, wie beispielsweise die Bebaubarkeit des Grundstücks und Art und Maß der baulichen Nutzung. Der Vorbescheid gilt meistens drei Jahre. Solange der Vorbescheid gilt, können bei einem nachfolgenden Genehmigungsverfahren die geklärten Punkte nicht abweichend beurteilt werden.</p>
          <p>&nbsp;</p>
          <h3 class="ttbase-heading ttbase-heading-none text-align-left ">Wann darf ich mit dem Bau beginnen?</h3>
            <div class="text">
              <p>Ist Ihr Bauvorhaben verfahrensfrei, können Sie mit dem Bau ohne weiteres beginnen. Eine gesonderte Mitteilung gegenüber der Bauaufsichtsbehörde&nbsp;ist nicht erforderlich. Sie müssen aber stets die geltenden Vorschriften beachten.</p>
              <p>Bei einem genehmigungsfreigestellten Vorhaben&nbsp;dürfen Sie in der Regel einen Monat, nachdem Sie alle erforderlichen Unterlagen bei der Gemeinde eingereicht haben, mit dem Bau beginnen.</p>
              <p>Wenn für Ihr Vorhaben ein Bauantrag erforderlich ist, beginnen Sie auf keinen Fall mit dem Bau, bevor Sie die Baugenehmigung erhalten haben. Es drohen Ihnen sonst drastische Strafen, bis hin zum Rückbau. Der Beginn der Bauarbeiten muss der Bauaufsichtsbehörde üblicherweise mindestens zwei Wochen vorher schriftlich angezeigt werden.</p>
                <p><i class="fa-solid fa-circle-exclamation"></i><strong>Unser Bauantragsservice begleitet Sie sicher bei der Bauantragsstellung. Auf Wunsch auch darüber hinaus.<br></br>
                  </strong></p>
            </div>
          </div>
        </div>
    </div>
</div> 
    </Container>
  );
};

export default Infos;
