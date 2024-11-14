// components/AnimalCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import { useInView } from 'react-intersection-observer';

const getFakeDescription = (name: string): string => {
  const descriptions = {
    Whiskers: `${name} este o pisică jucăușă și curioasă, întotdeauna în căutarea aventurilor în împrejurimi. Ea iubește să exploreze fiecare colț al casei și să urmărească micile detalii din jurul ei. Whiskers are un caracter afectuos și adoră compania altor pisici și a oamenilor, oferind iubire și mângâiere tuturor celor care îi acordă atenție. În momentele de liniște, îi place să se relaxeze la soare, visând la următoarele ei escapade.`,
    Shadow: `${name} este o pisică liniștită și introspectivă, care apreciază un mediu calm și ordonat. Ea preferă să observe tot ce se întâmplă dintr-un colț liniștit, dar își face prieteni rapid cu oamenii care au răbdare să o cunoască. Shadow este cunoscută pentru loialitatea ei și obișnuiește să își găsească un loc special în care să se cuibărească și să se simtă în siguranță. Este foarte atașată de familie și preferă compania celor apropiați.`,
    Mittens: `${name} este o pisică plină de energie și entuziasm, cunoscută pentru talentul ei de a transforma orice lucru într-o jucărie. Adoră să alerge prin cameră, să sară pe mobilă și să urmărească micile obiecte cu o curiozitate neobosită. Mittens este blândă și prietenoasă, având o conexiune specială cu copiii și cei care îi dau atenție. La sfârșitul zilei, după ce și-a consumat energia, îi place să se alinte lângă cineva drag, savurând fiecare mângâiere.`,
    Oreo: `${name} este o pisică extrem de sociabilă și iubitoare de oameni. Îi place să fie în centrul atenției și adoră când cineva se oprește să o mângâie. Oreo este mereu interesată să întâlnească persoane noi și să fie alintată. Ea se simte cel mai bine când este înconjurată de oameni, iar caracterul ei deschis și plin de viață o face adorabilă pentru oricine o cunoaște. În momentele liniștite, îi place să stea la fereastră și să privească afară, visând la o lume întreagă de explorat.`,
    Luna: `${name} este o pisică liniștită și iubitoare de confort, cunoscută pentru blândețea și afecțiunea ei. Îi place să se relaxeze în locuri însorite și să petreacă ore întregi lenevind într-un colț confortabil. Luna este foarte apropiată de familie și caută constant prezența celor dragi, oferind o companie caldă și liniștitoare. Când nu doarme, adoră să fie mângâiată și să audă vocea familiară a stăpânului ei, care îi aduce mereu o stare de pace.`,
  };

  return descriptions[name as keyof typeof descriptions] || `${name} este o pisică minunată care caută o casă iubitoare, unde să ofere toată afecțiunea și căldura ei.`;
};

type AnimalCardProps = {
  id: string;
  animalType: string;
  name: string;
  yearOfBirth: number;
  gender: string;
  sterilized: boolean;
  imageUrl: string;
  alternate: boolean;
};

const AnimatedCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'alternate',
})<{ alternate: boolean }>(({ theme, alternate }) => ({
  display: 'flex',
  flexDirection: alternate ? 'row-reverse' : 'row',
  margin: theme.spacing(6, 0),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.4s, box-shadow 0.4s',
  position: 'relative',
  opacity: 0,
  transform: alternate ? 'translateX(-150px)' : 'translateX(150px)', // Enhanced distance for more noticeable fade
  padding: 50, // Removed internal padding
  '&.fadeIn': {
    opacity: 1,
    transform: 'translateX(0)',
    transition: 'opacity 1s ease, transform 1s ease', // Slower transition for emphasis
  },
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.2)',
  },
}));

const ContentContainer = styled(CardContent)({
  padding: '24px', // Add padding here to control content spacing
  display: 'flex',
  flexDirection: 'column',
  gap: '16px', // Improved spacing between elements
});

export const AnimalCard: React.FC<AnimalCardProps> = ({
  animalType,
  name,
  yearOfBirth,
  gender,
  sterilized,
  imageUrl,
  alternate,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <AnimatedCard
      ref={ref}
      alternate={alternate}
      className={inView ? 'fadeIn' : ''}
      sx={{ p: 0, width: 1000 }} // Ensure no padding on the Card itself
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt={name}
        sx={{
          width: '30%',
          height: '10%',
          objectFit: 'cover',
          transition: 'transform 0.4s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />

      <ContentContainer>
        <Typography variant="h4" sx={{ color: 'green', fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Divider sx={{ my: 1, width: '80px', bgcolor: 'green' }} />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>Tip Animal:</strong> {animalType}</Typography>
          <Typography variant="body1"><strong>Anul Nașterii:</strong> {yearOfBirth}</Typography>
          <Typography variant="body1"><strong>Sex:</strong> {gender}</Typography>
          <Typography variant="body1"><strong>Sterilizare:</strong> {sterilized ? 'DA' : 'NU'}</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.6 }}>
          {getFakeDescription(name)}
        </Typography>
      </ContentContainer>
    </AnimatedCard>
  );
};
