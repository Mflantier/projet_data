<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Departement
 *
 * @ORM\Table(name="departement", indexes={@ORM\Index(name="departement_nom_soundex", columns={"departement_nom_soundex"}), @ORM\Index(name="departement_code", columns={"departement_code"}), @ORM\Index(name="departement_slug", columns={"departement_slug"})})
 * @ORM\Entity
 */
class Departement
{
    /**
     * @var int
     *
     * @ORM\Column(name="departement_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $departementId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="departement_code", type="string", length=3, nullable=true, options={"default"="NULL"})
     */
    private $departementCode = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="departement_nom", type="string", length=255, nullable=true, options={"default"="NULL"})
     */
    private $departementNom = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="departement_nom_uppercase", type="string", length=255, nullable=true, options={"default"="NULL"})
     */
    private $departementNomUppercase = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="departement_slug", type="string", length=255, nullable=true, options={"default"="NULL"})
     */
    private $departementSlug = 'NULL';

    /**
     * @var string|null
     *
     * @ORM\Column(name="departement_nom_soundex", type="string", length=20, nullable=true, options={"default"="NULL"})
     */
    private $departementNomSoundex = 'NULL';


}
